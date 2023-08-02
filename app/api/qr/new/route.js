import { connectToDB } from "@utils/database";
import QR from "@models/qr";
import QRStyle from "@models/QRStyle";
import User from "@models/user"; // Import the User model
import Replicate from "replicate";
import { NextResponse } from 'next/server';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export const POST = async (req) => {
  const { userId, input_url, styleId } = await req.json();

  try {
    await connectToDB();

    const selectedStyle = await QRStyle.findOne({ _id: styleId });
    if (!selectedStyle) {
      throw new Error("Style not found.");
    }
    console.log("Negative Prompt:", selectedStyle.negative_prompt);

    const output_uri = await replicate.run(
      "dannypostma/cog-visual-qr:7653601d0571fa6342ba4fa93a0962adebd1169e9e2329eefeb5729cac645d42",
      {
        input: {
          qr_code_content: input_url,
          prompt: selectedStyle.prompt,
          strength: selectedStyle.strength,
          negative_prompt: selectedStyle.negative_prompt,
          controlnet_conditioning_scale:  selectedStyle.controlnet_conditioning_scale,
          guidance_scale: selectedStyle.guidance_scale
        }
      }
    );

    const newQR = new QR({
      creator: userId,
      input_url,
      output_url: output_uri,
      style: selectedStyle.name
    });

    await newQR.save();

    // Deduct one credit from user's credits after generating the QR code
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found.");
    }
    user.credits -= 1;
    await user.save();

    // Return a success response with status code 201
    return NextResponse.json({ success: true }, { status: 201 });

  } catch (error) {
    // Return an error response with status code 500
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
};

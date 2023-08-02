import Replicate from "replicate";
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export const POST = async (request) => {
    const { userId, prompt, tag } = await request.json();

    try {
        await connectToDB();

        const output = await replicate.run(
            "dannypostma/cog-visual-qr:7653601d0571fa6342ba4fa93a0962adebd1169e9e2329eefeb5729cac645d42",
            {
                input: {
                    qr_code_content: prompt
                }
            }
        );

        if (!output || typeof output !== 'string' || !output.startsWith('https://')) {
            console.error("Failed to generate QR code. Replicate API output:", output);
            return new Response("Failed to generate QR code", { status: 500 });
        }

        const newPrompt = new Prompt({
            creator: userId,
            userInput: prompt,    // Storing user's input
            tag,
            qrCodeOutput: output  // Storing the QR code URL (output)
        });

        const savedPrompt = await newPrompt.save();
        const responseData = savedPrompt.toObject ? savedPrompt.toObject() : savedPrompt;
        return new Response(JSON.stringify(responseData), { status: 201 });

    } catch (error) {
        console.error("Error in /api/prompt/new route:", error);
        return new Response(JSON.stringify({ message: "Failed to create a new prompt", error: error.toString() }), { status: 500 });
    }
}

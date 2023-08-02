import QR from "@models/qr";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        // Add sorting by createdAt in descending order
        const qrs = await QR.find({ creator: params.id })
                             .sort({ createdAt: -1 })
                             .populate("creator")

        return new Response(JSON.stringify(qrs), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch QR's created by user", { status: 500 })
    }
}

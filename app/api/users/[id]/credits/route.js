import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const user = await User.findById(params.id);
        if (!user) {
            return new Response("User not found", { status: 404 })
        }

        return new Response(JSON.stringify({ credits: user.credits }), { status: 200 })
    } catch (error) {
        console.error("Failed to fetch user's credits:", error);
        return new Response("Internal Server Error", { status: 500 })
    }
}

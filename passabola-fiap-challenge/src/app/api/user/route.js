import { protectedRoute } from "@/lib/authMiddleware";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

async function GET_HANDLER(request) {
	await dbConnect();
	const { user } = request;
	const bdUser = await User.findById(user.id).select("-password");
	if (!bdUser) {
		return Response.json(
			{ message: "Usuário não encontrado." },
			{ status: 404 }
		);
	}
	return Response.json({ user: bdUser });
}

export const GET = protectedRoute(GET_HANDLER);

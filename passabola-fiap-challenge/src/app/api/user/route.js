import { protectedRoute } from "@/lib/authMiddleware";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

async function GET_HANDLER(request) {
	await dbConnect();
	const { searchParams } = request.nextUrl;
	const user = await User.findById(searchParams.get("id")).select("-password");
	if (!user) {
		return Response.json(
			{ message: "Usuário não encontrado." },
			{ status: 404 }
		);
	}
	return Response.json({ user });
}

export const GET = protectedRoute(GET_HANDLER);

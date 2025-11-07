import { protectedRoute } from "@/lib/authMiddleware";
import dbConnect from "@/lib/mongoose";
import Game from "@/models/Game";

async function GET_HANDLER(request, { params }) {
	await dbConnect();
	const gameId = params.id;
	const game = await Game.findById(gameId)
		.select()
		.populate("players", "-password");
	if (!game) {
		return Response.json({ message: "Jogo não encontrado." }, { status: 404 });
	}
	return Response.json({ game }, { status: 200 });
}
export const GET = protectedRoute(GET_HANDLER);

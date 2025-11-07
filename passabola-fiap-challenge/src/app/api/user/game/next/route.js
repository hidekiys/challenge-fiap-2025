import { protectedRoute } from "@/lib/authMiddleware";
import dbConnect from "@/lib/mongoose";
import Game from "@/models/Game";
import { NextResponse } from "next/server";

async function GET_HANDLER(request) {
	try {
		const { user } = request;

		await dbConnect();

		const nextGame = await Game.findOne({
			$or: [{ createdBy: user.id }, { players: user.id }],
			date: { $gt: new Date() },
		})
			.sort({ date: 1 })
			.populate("createdBy", "name email")
			.populate("players", "name email");

		if (!nextGame) {
			return NextResponse.json(
				{ message: "Nenhum jogo futuro encontrado" },
				{ status: 404 }
			);
		}

		return NextResponse.json(nextGame);
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
export const GET = protectedRoute(GET_HANDLER);

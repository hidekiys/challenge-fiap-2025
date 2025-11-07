import { protectedRoute } from "@/lib/authMiddleware";
import dbConnect from "@/lib/mongoose";
import Game from "@/models/Game";
import { NextResponse } from "next/server";

async function GET_HANDLER(request) {
	try {
		const { user } = request;
		const { searchParams } = new URL(request.url);
		const page = parseInt(searchParams.get("page")) || 1;
		const limit = parseInt(searchParams.get("limit")) || 10;
		const skip = (page - 1) * limit;

		await dbConnect();

		const [games, total] = await Promise.all([
			Game.find({
				$or: [{ createdBy: user.id }, { players: user.id }],
			})
				.sort({ date: 1 })
				.skip(skip)
				.limit(limit)
				.populate("createdBy", "name email")
				.populate("players", "name email"),
			Game.countDocuments({
				$or: [{ createdBy: user.id }, { players: user.id }],
			}),
		]);

		return NextResponse.json({
			games,
			currentPage: page,
			totalPages: Math.ceil(total / limit),
			totalGames: total,
		});
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export const GET = protectedRoute(GET_HANDLER);

import { protectedRoute } from "@/lib/authMiddleware";
import dbConnect from "@/lib/mongoose";
import Game from "@/models/Game";
import User from "@/models/User";

async function POST_HANDLER(request) {
	await dbConnect();
	const data = await request.json();

	try {
		const game = await Game.create({
			...data,
			createdBy: request.user.id,
			players: [request.user.id],
		});
		await User.findByIdAndUpdate(request.user.id, {
			$push: { jogos: game._id },
		});
		return Response.json({ game }, { status: 201 });
	} catch (error) {
		return Response.json(
			{ message: "Erro ao criar o jogo.", error: error.message },
			{ status: 400 }
		);
	}
}

async function PUT_HANDLER(request) {
	await dbConnect();
	const { searchParams } = request.nextUrl;
	const id = searchParams.get("id");
	const data = await request.json();

	try {
		const game = await Game.findById(id);
		if (!game) {
			return Response.json(
				{ message: "Jogo não encontrado." },
				{ status: 404 }
			);
		}

		if (game.createdBy.toString() !== request.user._id.toString()) {
			return Response.json(
				{ message: "Não autorizado a editar este jogo." },
				{ status: 403 }
			);
		}

		const updatedGame = await Game.findByIdAndUpdate(
			id,
			{ ...data },
			{ new: true, runValidators: true }
		);

		return Response.json({ game: updatedGame }, { status: 200 });
	} catch (error) {
		return Response.json(
			{ message: "Erro ao atualizar o jogo.", error: error.message },
			{ status: 400 }
		);
	}
}

async function DELETE_HANDLER(request) {
	await dbConnect();
	const { searchParams } = request.nextUrl;
	const id = searchParams.get("id");

	try {
		const game = await Game.findById(id);
		if (!game) {
			return Response.json(
				{ message: "Jogo não encontrado." },
				{ status: 404 }
			);
		}

		if (game.createdBy.toString() !== request.user.id.toString()) {
			return Response.json(
				{ message: "Não autorizado a deletar este jogo." },
				{ status: 403 }
			);
		}

		await Game.findByIdAndDelete(id);
		return Response.json(
			{ message: "Jogo deletado com sucesso." },
			{ status: 200 }
		);
	} catch (error) {
		return Response.json(
			{ message: "Erro ao deletar o jogo.", error: error.message },
			{ status: 400 }
		);
	}
}

export const POST = protectedRoute(POST_HANDLER);
export const PUT = protectedRoute(PUT_HANDLER);
export const DELETE = protectedRoute(DELETE_HANDLER);

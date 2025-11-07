import { protectedRoute } from "@/lib/authMiddleware";
import dbConnect from "@/lib/mongoose";
import Game from "@/models/Game";

async function GET_HANDLER(request) {
	await dbConnect();
	const { searchParams } = request.nextUrl;
	const game = await Game.findById(searchParams.get("id")).select();
	if (!game) {
		return Response.json({ message: "Jogo não encontrado." }, { status: 404 });
	}
	return Response.json({ game }, { status: 200 });
}

async function POST_HANDLER(request) {
	await dbConnect();
	const data = await request.json();

	try {
		const game = await Game.create({
			...data,
			createdBy: request.user._id,
			players: [request.user._id],
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

		if (game.createdBy.toString() !== request.user._id.toString()) {
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

export const GET = protectedRoute(GET_HANDLER);
export const POST = protectedRoute(POST_HANDLER);
export const PUT = protectedRoute(PUT_HANDLER);
export const DELETE = protectedRoute(DELETE_HANDLER);

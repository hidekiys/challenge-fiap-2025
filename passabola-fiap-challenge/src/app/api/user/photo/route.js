import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { protectedRoute } from "@/lib/authMiddleware";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST_HANDLER(request) {
	await dbConnect();
	try {
		const { user } = request;
		const formData = await request.formData();
		const file = formData.get("imagem");

		if (!file) {
			return NextResponse.json(
				{ message: "Dados incompletos." },
				{ status: 400 }
			);
		}

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);
		const customPublicId = `perfil_${user.id}`;

		const result = await new Promise((resolve, reject) => {
			cloudinary.v2.uploader
				.upload_stream(
					{ folder: "perfis", public_id: customPublicId, overwrite: true },
					(error, result) => {
						if (error) {
							reject(error);
						} else {
							resolve(result);
						}
					}
				)
				.end(buffer);
		});

		const imageUrl = result.secure_url;

		const updatedUser = await User.findByIdAndUpdate(
			user.id,
			{ imagemUrl: imageUrl },
			{ new: true, runValidators: true }
		);

		if (!updatedUser) {
			return NextResponse.json(
				{ message: "Usuário não encontrado." },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ imageUrl, user: updatedUser.name },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Erro de upload:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export const POST = protectedRoute(POST_HANDLER);

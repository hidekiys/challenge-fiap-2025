import { protectedRoute } from "@/lib/authMiddleware";
import dbConnect from "@/lib/mongoose";
import Post from "@/models/Posts";
import { NextResponse } from "next/server";

async function GET_HANDLER(request) {
	await dbConnect();
	try {
		const { searchParams } = new URL(request.url);
		const page = parseInt(searchParams.get("page")) || 1;
		const limit = parseInt(searchParams.get("limit")) || 10;
		const skip = (page - 1) * limit;

		const [posts, total] = await Promise.all([
			Post.find()
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(limit)
				.populate("createdBy", "name email imagemUrl")
				.populate("comments"),
			Post.countDocuments(),
		]);

		return NextResponse.json({
			posts,
			currentPage: page,
			totalPages: Math.ceil(total / limit),
			totalPosts: total,
		});
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

async function POST_HANDLER(request) {
	try {
		const { text } = await request.json();
		const { user } = request;

		await dbConnect();
		const post = await Post.create({
			text,
			createdBy: user.id,
		});

		await post.populate("createdBy", "name email");
		return NextResponse.json(post, { status: 201 });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

async function PUT_HANDLER(request) {
	try {
		const { id, text } = await request.json();
		const { user } = request;

		await dbConnect();
		const post = await Post.findById(id);

		if (!post) {
			return NextResponse.json({ error: "Post not found" }, { status: 404 });
		}

		if (post.createdBy.toString() !== user._id.toString()) {
			return NextResponse.json(
				{ error: "Não autorizado para alterar este post!" },
				{ status: 403 }
			);
		}

		post.text = text;
		await post.save();
		await post.populate("createdBy", "name email");

		return NextResponse.json(post);
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

async function DELETE_HANDLER(request) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");
		const { user } = request;

		await dbConnect();
		const post = await Post.findById(id);

		if (!post) {
			return NextResponse.json(
				{ error: "Post não encontrado" },
				{ status: 404 }
			);
		}

		if (post.createdBy.toString() !== user._id.toString()) {
			return NextResponse.json(
				{ error: "Não autorizado para alterar este post!" },
				{ status: 403 }
			);
		}

		await post.deleteOne();
		return NextResponse.json({ message: "Post deletado com suceeso!" });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export const GET = protectedRoute(GET_HANDLER);
export const POST = protectedRoute(POST_HANDLER);
export const PUT = protectedRoute(PUT_HANDLER);
export const DELETE = protectedRoute(DELETE_HANDLER);

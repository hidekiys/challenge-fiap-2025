import { protectedRoute } from "@/lib/authMiddleware";
import dbConnect from "@/lib/mongoose";
import Comment from "@/models/Comment";
import Post from "@/models/Posts";
import { NextResponse } from "next/server";

async function POST_HANDLER(request) {
	try {
		const { text, postId } = await request.json();
		const { user } = request;

		await dbConnect();

		const post = await Post.findById(postId);
		if (!post) {
			return NextResponse.json(
				{ error: "Post não encontrado" },
				{ status: 404 }
			);
		}

		const comment = await Comment.create({
			text,
			createdBy: user.id,
			post: postId,
		});

		post.comments.push(comment._id);
		await post.save();

		await comment.populate("createdBy", "name email");
		return NextResponse.json(comment, { status: 201 });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

async function DELETE_HANDLER(request) {
	try {
		const { searchParams } = new URL(request.url);
		const commentId = searchParams.get("id");
		const { user } = request;

		await dbConnect();
		const comment = await Comment.findById(commentId);

		if (!comment) {
			return NextResponse.json(
				{ error: "Comentário não encontrado" },
				{ status: 404 }
			);
		}

		if (comment.createdBy.toString() !== user._id.toString()) {
			return NextResponse.json(
				{ error: "Não autorizado para excluir este comentário" },
				{ status: 403 }
			);
		}

		await Post.findByIdAndUpdate(comment.post, {
			$pull: { comments: commentId },
		});

		await comment.deleteOne();
		return NextResponse.json({ message: "Comentário excluído com sucesso" });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

async function PUT_HANDLER(request) {
	try {
		const { commentId } = await request.json();
		const { user } = request;

		await dbConnect();
		const comment = await Comment.findById(commentId);

		if (!comment) {
			return NextResponse.json(
				{ error: "Comentário não encontrado" },
				{ status: 404 }
			);
		}

		const userLikedIndex = comment.likes.indexOf(user._id);

		if (userLikedIndex !== -1) {
			comment.likes.splice(userLikedIndex, 1);
		} else {
			comment.likes.push(user._id);
		}

		await comment.save();
		await comment.populate("likes", "name email");

		return NextResponse.json({
			comment,
			liked: userLikedIndex === -1,
		});
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export const POST = protectedRoute(POST_HANDLER);
export const DELETE = protectedRoute(DELETE_HANDLER);
export const PUT = protectedRoute(PUT_HANDLER);

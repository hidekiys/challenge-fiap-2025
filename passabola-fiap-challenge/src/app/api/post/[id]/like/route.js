import { protectedRoute } from "@/lib/authMiddleware";
import dbConnect from "@/lib/mongoose";
import Post from "@/models/Posts";
import { NextResponse } from "next/server";

async function POST_HANDLER(request, { params }) {
	try {
		const postId = params.id;
		const { user } = request;

		await dbConnect();
		const post = await Post.findById(postId);

		if (!post) {
			return NextResponse.json(
				{ error: "Post não encontrado" },
				{ status: 404 }
			);
		}

		const userLikedIndex = post.likes.indexOf(user.id);

		if (userLikedIndex !== -1) {
			post.likes.splice(userLikedIndex, 1);
		} else {
			post.likes.push(user.id);
		}

		await post.save();
		await post.populate("likes", "name email");

		return NextResponse.json({
			post,
			liked: userLikedIndex === -1,
		});
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export const POST = protectedRoute(POST_HANDLER);

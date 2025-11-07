import React, { useState } from "react";
import api from "@/lib/axiosClient";

export default function PostCard({ post, currentUserId }) {
	const [isLiked, setIsLiked] = useState(post.likes.includes(currentUserId));
	const [likeCount, setLikeCount] = useState(post.likes.length);
	const [isLiking, setIsLiking] = useState(false);

	const handleLike = async () => {
		if (isLiking) return;

		setIsLiking(true);

		const newIsLiked = !isLiked;
		const newCount = likeCount + (newIsLiked ? 1 : -1);

		setIsLiked(newIsLiked);
		setLikeCount(newCount);

		try {
			await api.post(`/api/post/${post._id}/like`);
		} catch (error) {
			console.error("Falha ao curtir/descurtir. Rollback do estado.", error);
			setIsLiked(!newIsLiked);
			setLikeCount(likeCount);
		} finally {
			setIsLiking(false);
		}
	};

	return (
		<div className="post-card p-4 border mb-2 shadow-sm rounded-lg w-full">
			<div className="flex items-center gap-2">
				<figure className="rounded-full overflow-hidden w-10">
					<img
						src={post.createdBy.imagemUrl}
						className="w-full"
						alt="imagem perfil"
					/>
				</figure>
				<h1>{post.createdBy.name}</h1>
			</div>

			<h2 className="text-xl font-semibold mb-2">{post.text}</h2>
			<p className="text-gray-600 mb-4">{post.content}</p>

			<div className="flex items-center">
				<button
					onClick={handleLike}
					disabled={isLiking}
					className={`flex items-center space-x-1 p-2 rounded transition duration-200 ${
						isLiked
							? "text-red-500 hover:bg-red-50"
							: "text-gray-500 hover:text-red-500 hover:bg-gray-100"
					}`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill={isLiked ? "currentColor" : "none"}
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="w-5 h-5"
					>
						<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
					</svg>
					<span>Curtir</span>
				</button>

				<span className="ml-3 text-sm text-gray-700">
					{likeCount} {likeCount === 1 ? "curtida" : "curtidas"}
				</span>
			</div>
		</div>
	);
}

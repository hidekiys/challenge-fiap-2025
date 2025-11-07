"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import api from "@/lib/axiosClient";
import PostCard from "@/app/components/PostCard";
import NovoPost from "@/app/components/NovoPost";

const fetchPosts = async (pageNumber, limit = 10) => {
	const response = await api.get(`/api/post?page=${pageNumber}&limit=${limit}`);
	return response.data;
};

const useAuth = () => {
	const currentUserId = null;
	return { currentUserId };
};

export default function Comunidade() {
	const { currentUserId } = useAuth();

	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const observerTarget = useRef(null);
	const POSTS_PER_PAGE = 10;

	const loadMorePosts = useCallback(async () => {
		if (isLoading || !hasMore) return;

		setIsLoading(true);
		try {
			const { posts: newPosts, totalPages } = await fetchPosts(
				page,
				POSTS_PER_PAGE
			);

			setPosts((prevPosts) => {
				const uniquePostsMap = new Map();

				prevPosts.forEach((post) => uniquePostsMap.set(post._id, post));

				newPosts.forEach((post) => uniquePostsMap.set(post._id, post));

				return Array.from(uniquePostsMap.values());
			});

			setHasMore(page < totalPages);
			setPage((prevPage) => prevPage + 1);
		} catch (error) {
			console.error("Erro ao carregar posts:", error.response || error.message);
		} finally {
			setIsLoading(false);
		}
	}, [isLoading, hasMore, page]);
	const handlePostCreated = () => {
		setPosts([]);
		setPage(1);
		setHasMore(true);
	};

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !isLoading && hasMore) {
					loadMorePosts();
				}
			},
			{ root: null, rootMargin: "20px", threshold: 1.0 }
		);

		const currentTarget = observerTarget.current;
		if (currentTarget) {
			observer.observe(currentTarget);
			if (posts.length === 0 && page === 1) loadMorePosts();
		}

		return () => {
			if (currentTarget) {
				observer.unobserve(currentTarget);
			}
		};
	}, [isLoading, hasMore, loadMorePosts, posts.length, page]);

	return (
		<>
			<div className="fixed bottom-5 right-5 w-20 h-20 ">
				<NovoPost onCriar={handlePostCreated} />
			</div>
			<div className="flex flex-col p-10 items-center">
				{posts.map((post) => (
					<PostCard
						key={post._id || post.id}
						post={post}
						currentUserId={currentUserId}
					/>
				))}

				<div ref={observerTarget} style={{ height: "1px" }}></div>

				{isLoading && <p className="text-center p-4">Carregando mais...</p>}

				{!hasMore && posts.length > 0 && (
					<p className="text-center p-4 text-gray-500">
						Você chegou ao fim da lista!
					</p>
				)}

				{!isLoading && posts.length === 0 && page > 1 && (
					<p className="text-center p-4">Nenhum post encontrado.</p>
				)}
			</div>
		</>
	);
}

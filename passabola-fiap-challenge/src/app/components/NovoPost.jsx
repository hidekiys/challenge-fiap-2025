"use client";

import api from "@/lib/axiosClient";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

export default function NovoPost({ onCriar }) {
	const [text, setText] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const novoPost = async (e) => {
		e.preventDefault();
		try {
			const res = await api.post("/api/post", { text });
			if (res.status == 201) {
				window.alert("Post criado com sucesso!");
				onCriar();
				setIsOpen(false);
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger className="w-full h-full hover:cursor-pointer transition-all hover:scale-105">
				<CirclePlus size={50} color="#ff8fdb" strokeWidth={0.75} />
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Novo Post</DialogTitle>
				<DialogDescription>Crie seu novo post</DialogDescription>
				<form className="flex flex-col gap-2" onSubmit={novoPost}>
					<textarea
						className="h-30 p-2 text-black"
						name="texto"
						id="texto"
						value={text}
						onChange={(e) => setText(e.target.value)}
					></textarea>
					<button
						type="input"
						className="p-2 shadow rounded-lg hover:cursor-pointer hover:scale-x-105 transition-all"
					>
						Enviar
					</button>
				</form>
			</DialogContent>
		</Dialog>
	);
}

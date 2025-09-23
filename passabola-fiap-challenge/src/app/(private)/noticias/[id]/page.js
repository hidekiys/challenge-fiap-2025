"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Noticias() {
	const [noticia, setNoticia] = useState(null);
	const { id } = useParams();
	axios.get("/data/noticias.json").then(async (res) => {
		const not = await res.data.find((n) => n.id == id);
		setNoticia(not);
	});

	return noticia != null ? (
		<div className=" w-full flex justify-center">
			<h1 className="mt-4">{noticia.manchete}</h1>
		</div>
	) : (
		<h1>404 Não foi encontrado essa notícia</h1>
	);
}

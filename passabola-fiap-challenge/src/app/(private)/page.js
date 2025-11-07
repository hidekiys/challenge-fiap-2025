"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Noticia from "../components/Noticia";
import Link from "next/link";
import TabelaCampeonato from "../components/TabelaCampeonato";
import ProximoJogo from "../components/ProximoJogo";

export default function Home() {
	const [loading, setLoading] = useState(true);
	const [doMomento, setDoMomento] = useState([]);
	const [campeonato, setCampeonato] = useState([]);

	useEffect(() => {
		try {
			axios.get("/data/noticias.json").then((res) => {
				setDoMomento(res.data);
			});
			axios.get("/data/brasileirao.json").then((res) => {
				setCampeonato(res.data);
			});
		} catch (e) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, []);

	return (
		<div className="mt-8 mx-5 flex flex-col gap-5">
			<div className="flex justify-between">
				<h1 className="font-bold text-2xl ">Próximo jogo</h1>
				<Link
					href={"/jogos"}
					className="hover:text-principal-600 transition-all"
				>
					ver todos
				</Link>
			</div>

			<ProximoJogo />
			<div className="flex">
				<div className="w-3/5">
					<h1 className="font-bold text-2xl mt-3">Do momento</h1>
					<ul className="p-5 flex flex-col gap-3">
						{doMomento.length > 0 ? (
							doMomento.map((n) => {
								return (
									<Noticia
										key={n.id}
										titulo={n.manchete}
										lide={n.lide}
										id={n.id}
										tipo={n.tipo}
									/>
								);
							})
						) : (
							<h1>Não foi encontrado nada do momento.</h1>
						)}
					</ul>
				</div>
				<TabelaCampeonato campeonato={campeonato} />
			</div>
		</div>
	);

	function formatarData(dataString) {
		if (!dataString || dataString.indexOf("-") === -1) {
			return "Formato de data inválido";
		}

		const partes = dataString.split("-");
		return partes.join("/");
	}
}

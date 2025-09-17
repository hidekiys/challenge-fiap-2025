"use client";

import Image from "next/image";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Noticia from "./components/Noticia";
import Link from "next/link";
import TabelaCampeonato from "./components/TabelaCampeonato";

export default function Home() {
	const [jogos, setJogos] = useState([]);
	const [jogo, setJogo] = useState(<h1>Você não possui próximos jogos</h1>);
	const [loading, setLoading] = useState(true);
	const [doMomento, setDoMomento] = useState([]);
	const [campeonato, setCampeonato] = useState([]);

	useEffect(() => {
		try {
			axios.get("/data/jogos.json").then((response) => {
				setJogos(response.data);
			});

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
	useEffect(() => {
		if (jogos.length > 0) {
			setJogo(
				<Link
					href={`/jogo/${jogos[0].id}`}
					className="p-5 shadow flex w-full justify-between align-middle rounded-2xl hover:scale-[101%] transition-all"
				>
					<div>
						<h1 className="text-xl">{jogos[0].nome}</h1>
						<p>{jogos[0].local}</p>
						<p>{formatarData(jogos[0].data) + ", " + jogos[0].hora}</p>
					</div>
					<div className="flex flex-col items-end">
						<p>
							{jogos[0].jogadoras.length}/{jogos[0].max_jogadoras}
						</p>
						<button className="py-2 px-4 border rounded-xl border-cinza-principal">
							Inscrita
						</button>
					</div>
				</Link>
			);
		}
	}, [jogos]);

	return (
		<div className="mt-8 mx-5 flex flex-col gap-5">
			<h1 className="font-bold text-2xl ">Próximo jogo</h1>
			{jogo}
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

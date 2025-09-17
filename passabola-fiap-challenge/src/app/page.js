"use client";

import Image from "next/image";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
	const [jogos, setJogos] = useState([]);
	const [jogo, setJogo] = useState(<h1>Você não possui próximos jogos</h1>);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		axios
			.get("/data/jogos.json")
			.then((response) => {
				setJogos(response.data);
			})
			.catch((error) => console.error(error))
			.finally(setLoading(false));
	}, []);
	useEffect(() => {
		if (jogos.length > 0) {
			setJogo(
				<div className="p-5 shadow flex w-full justify-between align-middle rounded-2xl mt-3">
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
				</div>
			);
		}
	}, [jogos]);

	return (
		<div className="mt-8 mx-5">
			<h1 className="font-bold text-2xl ">Próximo jogo</h1>
			{jogo}
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

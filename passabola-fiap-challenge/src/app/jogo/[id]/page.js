"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Jogo() {
	const [jogos, setJogos] = useState([]);
	const [jogo, setJogo] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		axios.get("/data/jogos.json").then((res) => {
			setJogos(res.data);
		});
	}, []);
	useEffect(() => {
		if (jogos.length > 0) {
			setJogo(jogos.find((j) => j.id == parseInt(id)));
		}
	}, [jogos]);
	if (jogo == null) {
		return <>Jogo não encontrado</>;
	} else {
		return (
			<div className="m-10 flex flex-col gap-3">
				<div className="p-5 shadow flex w-full justify-between align-middle rounded-2xl ">
					<div>
						<h1 className="text-xl">{jogo.nome}</h1>
						<p>{jogo.local}</p>
						<p>{formatarData(jogo.data) + ", " + jogo.hora}</p>
					</div>
					<div className="flex flex-col items-end">
						<p>
							{jogo.jogadoras.length}/{jogo.max_jogadoras}
						</p>
						<button className="py-2 px-4 border rounded-xl border-cinza-principal">
							Inscrita
						</button>
					</div>
				</div>
				<div className="flex mt-3">
					<div className="w-1/3 flex flex-col gap-3 min-h-80">
						<h1 className="font-bold text-2xl">Jogadoras</h1>
						<ul className="shadow rounded-lg flex flex-col gap-3 p-5 h-full">
							{jogo.jogadoras.length > 0 ? (
								jogo.jogadoras.map((j) => {
									return (
										<li className="flex justify-between">
											<p>{j.nome}</p>
											<div className="flex gap-2">
												<p>{j.numero_camisa}</p>
												<p>{j.posicao}</p>
											</div>
										</li>
									);
								})
							) : (
								<>Ainda não há jogadoras</>
							)}
						</ul>
					</div>
					<div></div>
				</div>
			</div>
		);
	}

	function formatarData(dataString) {
		if (!dataString || dataString.indexOf("-") === -1) {
			return "Formato de data inválido";
		}

		const partes = dataString.split("-");
		return partes.join("/");
	}
}

"use client";

import api from "@/lib/axiosClient";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Jogo() {
	const [jogo, setJogo] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		buscarJogo();
	}, []);

	const buscarJogo = async () => {
		await api.get(`/api/game/${id}`).then((res) => {
			setJogo(res.data.game);
		});
	};
	if (jogo == null) {
		return <>Jogo não encontrado</>;
	} else {
		return (
			<div className="m-10 flex flex-col gap-3">
				<div className="p-5 shadow flex w-full justify-between align-middle rounded-2xl ">
					<div>
						<h1 className="text-xl">{jogo.title}</h1>
						<p>{jogo.location}</p>
						<p>
							{formatarData(jogo.date).toLocaleDateString() +
								", " +
								formatarData(jogo.date).toLocaleTimeString()}
						</p>
					</div>
					<div className="flex flex-col items-end">
						<p>
							{jogo.players?.length}/{jogo.maxPlayers}
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
							{jogo.players?.length > 0 ? (
								jogo.players.map((j) => {
									return (
										<li key={j._id} className="flex justify-between">
											<p>{j.name}</p>
											<div className="flex gap-2">
												<p>{j.position}</p>
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
		const data = new Date(dataString);

		return data;
	}
}

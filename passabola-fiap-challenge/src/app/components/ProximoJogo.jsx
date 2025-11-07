import api from "@/lib/axiosClient";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProximoJogo() {
	const [proximoJogo, setProximoJogo] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		buscarProximoJogo();
	}, []);

	function formatarData(dataString) {
		const data = new Date(dataString);

		return data;
	}

	const buscarProximoJogo = async () => {
		try {
			setLoading(true);
			const response = await api.get("/api/user/game/next");
			if (!response.ok) {
			}
			setProximoJogo(response.data);
		} catch (error) {
			console.error("Erro ao buscar o próximo jogo:", error);
		} finally {
			setLoading(false);
		}
	};

	if (proximoJogo === null) {
		return <h1>Você não possui próximos jogos</h1>;
	}
	if (loading) {
		return <p>Carregando próximo jogo...</p>;
	}
	return (
		<Link
			href={`/jogo/${proximoJogo?._id}`}
			className="p-5 shadow flex w-full justify-between align-middle rounded-2xl hover:scale-[101%] transition-all"
		>
			<div>
				<h1 className="text-xl">{proximoJogo.title}</h1>
				<p>{proximoJogo.location}</p>
				<p>
					{formatarData(proximoJogo.date).toLocaleDateString() +
						", " +
						formatarData(proximoJogo.date).toLocaleTimeString()}
				</p>
			</div>
			<div className="flex flex-col items-end">
				<p>
					{proximoJogo.players.length}/{proximoJogo.maxPlayers}
				</p>
				<button className="py-2 px-4 border rounded-xl border-cinza-principal">
					Inscrita
				</button>
			</div>
		</Link>
	);
}

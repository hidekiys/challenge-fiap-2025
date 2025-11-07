import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProximoJogo() {
	const [proximoJogo, setProximoJogo] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		buscarProximoJogo();
	}, []);

	const buscarProximoJogo = async () => {
		try {
			setLoading(true);
			const response = await axios.get("/api/user/game/next");
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
			href={`/jogo/${proximoJogo?.id}`}
			className="p-5 shadow flex w-full justify-between align-middle rounded-2xl hover:scale-[101%] transition-all"
		>
			<div>
				<h1 className="text-xl">{proximoJogo.nome}</h1>
				<p>{proximoJogo.local}</p>
				<p>{formatarData(proximoJogo.data) + ", " + proximoJogo.hora}</p>
			</div>
			<div className="flex flex-col items-end">
				<p>
					{proximoJogo.jogadoras.length}/{proximoJogo.max_jogadoras}
				</p>
				<button className="py-2 px-4 border rounded-xl border-cinza-principal">
					Inscrita
				</button>
			</div>
		</Link>
	);
}

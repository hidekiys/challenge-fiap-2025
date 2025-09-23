"use client";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import axios from "axios";
import Link from "next/link";

const Notificacoes = () => {
	const [ativo, setAtivo] = useState(false);
	const [notificacoes, setNotificacoes] = useState([]);

	useEffect(() => {
		axios.get("/data/user.json").then((res) => {
			setNotificacoes(res.data.notificacoes);
		});
	}, []);

	return (
		<>
			<button
				onClick={() => setAtivo(!ativo)}
				className={`bg-white w-8 h-8 p-2 flex justify-center align-middle hover:cursor-pointer hover:scale-105 transition-all
					${ativo == true ? "rounded-t-lg" : "rounded-lg"}
					`}
			>
				<Bell color="#EE4D9B" className="w-full  h-full" />
			</button>
			<ul
				className={`${
					ativo ? "opacity-100" : "opacity-0 pointer-events-none"
				} fixed right-6 top-10 min-h-40 w-80 rounded-l-lg rounded-b-lg py-4 transition-opacity duration-300 bg-white`}
			>
				{notificacoes.length > 0
					? notificacoes.map((n, index) => {
							return (
								<li
									key={index}
									className="hover:bg-principal-300 transition-all"
								>
									<Link
										href={n.link}
										className="flex justify-between p-2"
										onClick={() => setAtivo(!ativo)}
									>
										<p>{n.titulo}</p>
										<p>{new Date(n.data).toLocaleDateString("pt-br")}</p>
									</Link>
								</li>
							);
					  })
					: "Você não tem notificações"}
			</ul>
		</>
	);
};

export default Notificacoes;

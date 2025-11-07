"use client";

import ExportarFoto from "@/app/components/EditarFoto";
import api from "@/lib/axiosClient";
import { useEffect, useState } from "react";

export default function Perfil() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	// 💡 Defina a função buscarUsuario DENTRO do useEffect
	useEffect(() => {
		async function buscarUsuario() {
			try {
				setLoading(true);
				const res = await api.get("/api/user");
				console.log(res.data);
				setUser(res.data.user);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}
		buscarUsuario();
	}, []);

	if (loading) {
		return <>Carregando...</>;
	} else if (user) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				<div className=" border rounded-2xl border-principal-300 w-1/2 mt-10 p-10 flex items-center justify-normal">
					<div className="flex flex-col items-center gap-2">
						<figure className="w-1/3 rounded-full overflow-hidden">
							<img
								src={user.imagemUrl ? user.imagemUrl : "/img/image.png"}
								className="w-full h-full"
								alt="Imagem de perfil"
							/>
						</figure>
						<ExportarFoto />
					</div>
					<div>
						<h1>{user?.name}</h1>
						<h1>{user.email}</h1>
					</div>
				</div>
			</div>
		);
	} else {
		return <>404 Uusário não encontrado!</>;
	}
}

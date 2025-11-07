"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
	const [formRegister, setFormRegister] = useState({
		name: "",
		email: "",
		password: "",
	});
	const router = useRouter();

	const handleRegister = (e) => {
		e.preventDefault();
		axios
			.post("/api/auth/register", { ...formRegister })
			.then((res) => {
				router.push("/login");
			})
			.catch((e) => {
				if (e.status == 401) {
					alert("Usuário ou senha incorreta");
				} else {
					alert("Falha ao realizar o registro");
				}
			});
	};
	return (
		<>
			<div className="flex min-h-screen items-center justify-center overflow-hidden">
				<form className="relative z-10 p-8 flex flex-col gap-2">
					<div className="flex flex-col gap-2">
						<h1 className="font-bold text-principal-600 text-5xl">REGISTRO</h1>
						<input
							type="text"
							className="border shadow border-gray-50 rounded-2xl py-2 px-4 w-[40vw] focus:outline-complementar-500"
							placeholder="Digite seu nome..."
							value={formRegister.name}
							onChange={(e) =>
								setFormRegister({ ...formRegister, name: e.target.value })
							}
						/>
						<input
							type="text"
							className="border shadow border-gray-50 rounded-2xl py-2 px-4 w-[40vw] focus:outline-complementar-500"
							placeholder="Digite seu email..."
							value={formRegister.email}
							onChange={(e) =>
								setFormRegister({ ...formRegister, email: e.target.value })
							}
						/>
						<input
							type="password"
							className="border shadow border-gray-50 rounded-2xl py-2 px-4 w-[40vw] focus:outline-complementar-500"
							placeholder="Digite sua senha..."
							value={formRegister.password}
							onChange={(e) =>
								setFormRegister({ ...formRegister, password: e.target.value })
							}
						/>
					</div>
					<div className="flex justify-between mt-2">
						<label className="flex gap-2 justify-center items-center h-2 hover:cursor-pointer text-gray-500">
							<input
								type="checkbox"
								className="w-4 h-4 rounded-full border border-gray-200 shadow appearance-none peer hover:border-complementar-500 checked:bg-complementar-500 
                                hover:border-2 transition-all"
							/>
							Aceitar termos
						</label>
						<button
							className="px-8 py-2 border-2 border-complementar-500 rounded-2xl text-complementar-500 font-bold text-2xl
                        hover:cursor-pointer hover:border-principal-600 hover:text-principal-600 transition-all
                        "
							onClick={handleRegister}
						>
							REGISTRAR-SE
						</button>
					</div>
					<h2 className="text-gray-400 text-lg self-center mt-6 font-light">
						Já tem uma conta?{" "}
						<Link href="/registro" className="text-principal-600">
							Logue-se
						</Link>
					</h2>
				</form>

				<div className="absolute -right-20 -top-20 h-[120%] w-3/5 rounded-l-full bg-principal-600 opacity-20 translate-x-50" />

				<div className="absolute -right-20 -top-20 h-[120%] w-3/5 rounded-l-full bg-principal-600 opacity-50 translate-x-80" />
				<div className="absolute -right-20 -top-20 h-[120%] w-3/5 rounded-l-full bg-principal-600 translate-x-[50%]" />
				<div className="absolute right-20 w-50 h-50 rounded-l-full">
					<img src="img/logo-branca.png" className="h-full w-full" />
				</div>
			</div>
		</>
	);
}

"use client";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import api from "@/lib/axiosClient";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

export default function Jogos() {
	const [form, setForm] = useState({
		title: "",
		date: "",
		location: "",
		maxPlayers: "",
	});
	const [submitting, setSubmitting] = useState(false);
	const [message, setMessage] = useState("");
	const [jogos, setJogos] = useState([]);
	const closeRef = useRef(null);
	const getJogos = async (pageNumber = 1, limit = 10) => {
		try {
			const url = `/api/user/game?page=${pageNumber}&limit=${limit}`;

			const response = await api.get(url);

			setJogos(response.data.games);
		} catch (error) {
			console.error(
				"Erro ao buscar jogos:",
				error.response?.data || error.message
			);

			throw new Error("Falha ao carregar a lista de jogos.");
		}
	};
	useEffect(() => {
		getJogos();
	}, []);

	function handleChange(e) {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
		getJogos();
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setSubmitting(true);
		setMessage("");
		try {
			const payload = {
				title: form.title,
				date: form.date,
				location: form.location,
				maxPlayers: form.maxPlayers ? Number(form.maxPlayers) : 0,
			};

			const res = await api.post("/api/game", payload);

			if (res.status != 201) {
				throw new Error(text || "Erro ao criar jogo");
			}

			setMessage("Jogo criado com sucesso.");
			setForm({ title: "", date: "", location: "", maxPlayers: "" });
			closeRef.current?.click();
		} catch (err) {
			setMessage(String(err.message || err));
		} finally {
			setSubmitting(false);
		}
	}
	function formatarData(dataString) {
		const data = new Date(dataString);

		return data;
	}

	return (
		<>
			<ul className="p-5 flex flex-col items-center">
				{jogos.length < 1
					? ""
					: jogos.map((j) => {
							return (
								<Link
									key={j._id}
									href={`/jogo/${j?._id}`}
									className="p-5 shadow flex w-full justify-between align-middle rounded-2xl hover:scale-[101%] transition-all"
								>
									<div>
										<h1 className="text-xl">{j.title}</h1>
										<p>{j.location}</p>
										<p>
											{formatarData(j.date).toLocaleDateString() +
												", " +
												formatarData(j.date).toLocaleTimeString()}
										</p>
									</div>
									<div className="flex flex-col items-end">
										<p>
											{j.players.length}/{j.maxPlayers}
										</p>
										<button className="py-2 px-4 border rounded-xl border-cinza-principal">
											Inscrita
										</button>
									</div>
								</Link>
							);
					  })}
			</ul>
			<Dialog>
				<DialogTrigger
					asChild
					className="fixed bottom-5 right-5 w-12 h-12 hover:cursor-pointer transition-all hover:scale-105"
				>
					<CirclePlus size={50} color="#ff8fdb" strokeWidth={0.75} />
				</DialogTrigger>

				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Novo jogo</DialogTitle>
						<DialogDescription>Criar novo jogo.</DialogDescription>
					</DialogHeader>

					<form onSubmit={handleSubmit} className="grid gap-4 py-2">
						<div className="grid gap-1">
							<label className="text-sm font-medium">Título</label>
							<input
								name="title"
								value={form.title}
								onChange={handleChange}
								required
								className="w-full rounded border px-2 py-1"
								placeholder="Nome do jogo"
							/>
						</div>

						<div className="grid gap-1">
							<label className="text-sm font-medium">Data e hora</label>
							<input
								name="date"
								value={form.date}
								onChange={handleChange}
								type="datetime-local"
								required
								className="w-full rounded border px-2 py-1"
							/>
						</div>

						<div className="grid gap-1">
							<label className="text-sm font-medium">Local</label>
							<input
								name="location"
								value={form.location}
								onChange={handleChange}
								required
								className="w-full rounded border px-2 py-1"
								placeholder="Ex: Estádio, Bairro"
							/>
						</div>

						<div className="grid gap-1">
							<label className="text-sm font-medium">Máximo de jogadores</label>
							<input
								name="maxPlayers"
								value={form.maxPlayers}
								onChange={handleChange}
								type="number"
								min={1}
								required
								className="w-full rounded border px-2 py-1"
								placeholder="10"
							/>
						</div>

						{message && <p className="text-sm text-green-600">{message}</p>}

						<div className="flex justify-end gap-2">
							<DialogClose asChild>
								<button type="button" className="px-3 py-1 rounded border">
									Cancelar
								</button>
							</DialogClose>

							<button
								type="submit"
								disabled={submitting}
								className="px-3 py-1 rounded bg-green-600 text-white disabled:opacity-60"
							>
								{submitting ? "Salvando..." : "Salvar"}
							</button>
						</div>

						<DialogClose asChild>
							<button ref={closeRef} style={{ display: "none" }} />
						</DialogClose>
					</form>

					<DialogFooter />
				</DialogContent>
			</Dialog>
		</>
	);
}

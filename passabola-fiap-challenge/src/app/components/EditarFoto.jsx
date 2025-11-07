"use client";

import api from "@/lib/axiosClient";
import { useState } from "react";
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

export default function ExportarFoto() {
	const [selectedFile, setSelectedFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState("/img/image.png");

	const handleFileChange = (event) => {
		const file = event.target.files[0];

		if (file) {
			setSelectedFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewUrl(reader.result);
			};
			reader.readAsDataURL(file);
		} else {
			setSelectedFile(null);
			setPreviewUrl("");
		}
	};
	const handleUpload = async (e) => {
		e.preventDefault();

		if (!selectedFile) return alert("Selecione uma imagem.");

		try {
			const formData = new FormData();
			formData.append("imagem", selectedFile);
			const response = api.post("/api/user/photo", formData, {});

			const data = await response.json();

			if (response.ok) {
				alert(`Upload bem-sucedido! URL: ${data.imageUrl}`);
				// Atualize o estado do componente com a nova URL
			} else {
				alert(`Erro no upload: ${data.message}`);
			}
		} catch (error) {
			console.error(error);
			alert("Erro de rede ao enviar o arquivo.");
		}
	};

	return (
		<Dialog>
			<DialogTrigger className="p-2 shadow rounded-2xl hover:cursor-pointer hover:-translate-y-1 transition-all">
				Editar foto
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Editar foto</DialogTitle>
				<DialogDescription>
					Selecione uma imagem e clique em Enviar Imagem.
				</DialogDescription>
				<div className="flex justify-center flex-col items-center gap-2">
					<figure className="w-30 rounded-full overflow-hidden">
						<img src={previewUrl} alt="previw foto" className="w-full h-full" />
					</figure>
					<form
						onSubmit={handleUpload}
						className="flex flex-col items-center gap-2"
					>
						<input
							className="p-2 shadow rounded-lg hover:cursor-pointer hover:scale-x-105 transition-all"
							type="file"
							id="file-upload"
							name="imagem"
							accept="image/*"
							onChange={handleFileChange}
						/>
						<button
							type="submit"
							className="border border-principal-600 p-2 rounded-lg hover:cursor-pointer hover:scale-x-105 transition-all"
						>
							Enviar Imagem
						</button>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
}

import { promises as fs } from "fs";
import path from "path";

export async function POST(request) {
	try {
		const body = await request.json();
		const { user, senha } = body.formLogin;

		const filePath = path.join(process.cwd(), "public", "data", "user.json");

		const fileContents = await fs.readFile(filePath, "utf8");
		const usuario = JSON.parse(fileContents);
		console.log(usuario.user);

		if (usuario.user === user && usuario.senha === senha) {
			return new Response("Sucesso!", { status: 200 });
		} else {
			return new Response("Credenciais inválidas", { status: 401 });
		}
	} catch (error) {
		console.error("Erro na autenticação:", error);
		return new Response("Erro interno do servidor", { status: 500 });
	}
}

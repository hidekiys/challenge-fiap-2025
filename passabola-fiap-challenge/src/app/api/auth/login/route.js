import dbConnect from "@/lib/mongoose";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export async function POST(req) {
	await dbConnect();
	const body = await req.json();
	const { email, password } = body;

	//Models
	const User = require("@/models/User");

	//Validações
	if (!email) {
		return Response.json({ message: "Email é obrigatório." }, { status: 422 });
	}
	if (!password) {
		return Response.json({ message: "Senha é obrigatória." }, { status: 422 });
	}

	const user = await User.findOne({ email: email });
	if (!user) {
		return Response.json(
			{ message: "Este usuário não foi encontrado." },
			{ status: 404 }
		);
	}

	//Validação da senha
	const checkPassword = await bcrypt.compare(password, user.password);
	if (!checkPassword) {
		return Response.json({ message: "Senha inválida." }, { status: 422 });
	}

	try {
		const secret = process.env.SECRET;
		const token = jwt.sign(
			{
				id: user._id,
				name: user.name,
				email: user.email,
			},
			secret,
			{ expiresIn: "7d" }
		);

		return Response.json(
			{ token, message: "Login realizado com sucesso!" },
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return Response.json(
			{ message: "Erro ao gerar token de autenticação." },
			{ status: 500 }
		);
	}
}

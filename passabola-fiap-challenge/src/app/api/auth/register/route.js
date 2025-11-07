import dbConnect from "@/lib/mongoose";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export async function POST(req) {
	await dbConnect();
	const body = await req.json();
	const { name, email, password } = body;

	//Models
	const User = require("@/models/User");

	//Validações
	if (!name) {
		return Response.json({ message: "Nome é obrigatório." }, { status: 422 });
	}
	if (!email) {
		return Response.json({ message: "Email é obrigatório." }, { status: 422 });
	}
	if (!password) {
		return Response.json({ message: "Senha é obrigatória." }, { status: 422 });
	}

	const userExists = await User.findOne({ email: email });
	if (userExists) {
		return Response.json({ message: "Email já cadastrado." }, { status: 422 });
	}

	//Criptografa a senha
	const salt = await bcrypt.genSalt(12);
	const passwordHash = await bcrypt.hash(password, salt);

	//Cria o usuário no banco
	const newUser = new User({
		name,
		email,
		password: passwordHash,
	});

	try {
		await newUser.save();
		return Response.json(
			{ message: "Usuário cadastrado com sucesso." },
			{ status: 201 }
		);
	} catch (error) {
		console.log(error);
		return Response.json(
			{ message: "Erro ao cadastrar usuário." },
			{ status: 500 }
		);
	}
}

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SECRET;

export function protectedRoute(handler) {
	return async (request, context) => {
		const authHeader = request.headers.get("authorization");
		const token = authHeader && authHeader.split(" ")[1];

		if (!token) {
			return NextResponse.json(
				{ message: "Acesso negado. Token não fornecido." },
				{ status: 401 }
			);
		}

		try {
			const userPayload = jwt.verify(token, JWT_SECRET);

			request.user = userPayload;

			return handler(request, context);
		} catch (error) {
			if (
				error.name === "TokenExpiredError" ||
				error.name === "JsonWebTokenError"
			) {
				return NextResponse.json(
					{ message: "Token inválido ou expirado." },
					{ status: 403 }
				);
			}
			return NextResponse.json(
				{ message: "Erro de autenticação desconhecido." },
				{ status: 500 }
			);
		}
	};
}

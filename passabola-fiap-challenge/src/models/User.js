const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	time: { type: String, required: false },
	idade: { type: Number, required: false },
	imagemUrl: { type: String, required: false },
	jogos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
	posicao: { type: String, required: false },
	createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;

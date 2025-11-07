const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	title: { type: String, required: true },
	date: { type: Date, required: true },
	location: { type: String, required: true },
	players: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	maxPlayers: { type: Number, required: true },
	createdAt: { type: Date, default: Date.now },
});

const Game = mongoose.models.Game || mongoose.model("Game", GameSchema);

module.exports = Game;

const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
	text: { type: String, required: true },
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post",
		required: true,
	},
	likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	createdAt: { type: Date, default: Date.now },
});

const Comment =
	mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

module.exports = Comment;

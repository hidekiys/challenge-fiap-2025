const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
	text: { type: String, required: true },
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
	createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

module.exports = Post;

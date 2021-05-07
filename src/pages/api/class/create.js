import { connectToDatabase } from "../../../utils/mongodb";
import withJoi from "../../../middleware/withJoi";
import Joi from "joi";

export default withJoi(
	async function handler(req, res) {
		const { db } = await connectToDatabase();
		db.collection("classes").insertOne({
			name: req.body.name,
			description: req.body.description,
			created_at: Date.now()
		}); //TODO: User ID
		return res.status(200).send("OK");
	},
	Joi.object({
		name: Joi.string().min(1).max(32).required(),
		description: Joi.string().min(1).max(128)
	})
);

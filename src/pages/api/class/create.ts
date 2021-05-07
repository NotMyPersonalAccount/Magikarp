import { connectToDatabase } from "../../../utils/mongodb";
import withJoi from "../../../middleware/withJoi";
import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";

export default withJoi(
	async function handler(req: NextApiRequest, res: NextApiResponse) {
		const { db } = await connectToDatabase();
		await db.collection("classes").insertOne({
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

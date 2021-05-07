import { connectToDatabase } from "../../../utils/mongodb";
import withJoi from "../../../middleware/withJoi";
import Joi from "joi";

export default withJoi(async function handler(req, res) {
	let { db } = await connectToDatabase();
	db.collection("classes").insertOne({
		name: req.body.name
	});
	return res.status(200).send("OK");
}, Joi.object({ name: Joi.string().required() }));

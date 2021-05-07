import { ObjectSchema } from "joi";
import { NextApiRequest, NextApiResponse } from "next";

export default function withJoi(
	handler: (req, res) => void,
	schema: ObjectSchema
) {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		if (req.method !== "POST") {
			return res.status(405).send("Expected POST method");
		}
		if (schema.validate(req.body).error) {
			return res.status(422).send("Invalid payload");
		}
		return handler(req, res);
	};
}

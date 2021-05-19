import { ObjectSchema } from "joi";
import { NextApiRequest, NextApiResponse } from "next";

export default function withJoi(
	handler: (req, res) => void,
	schema: ObjectSchema
) {
	return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
		if (req.method !== "POST")
			return res.status(405).send("Expected POST method");
		const error = schema.validate(req.body).error;
		if (error) return res.status(422).send(error.message);
		return handler(req, res);
	};
}

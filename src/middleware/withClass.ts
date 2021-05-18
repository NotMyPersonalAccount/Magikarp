import { NextApiResponse } from "next";
import { APIRequestWithClass } from "../types/request";
import withSession from "./withSession";
import prisma from "../prisma/prisma";

export default function withClass(
	handler: (req: APIRequestWithClass, res: NextApiResponse) => void
) {
	return async (req: APIRequestWithClass, res: NextApiResponse) => {
		return withSession(
			async (req: APIRequestWithClass, res: NextApiResponse) => {
				const _class = await prisma.class.findFirst({
					where: { id: req.body.class_id || req.body.id },
					include: { enrollment: true }
				});
				if (_class === null)
					return res.status(404).send("Class does not exist");

				req.class = _class;
				return handler(req, res);
			}
		)(req, res);
	};
}

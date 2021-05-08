import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

export default function withSession(handler: (req, res) => void) {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		const session = await getSession({ req });
		if (session === null) {
			return res.status(401).send("Unauthorized access");
		}
		// @ts-ignore
		req.user = session.user;
		return handler(req, res);
	};
}

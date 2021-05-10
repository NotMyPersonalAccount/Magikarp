import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

export default function withSession(handler: (req, res, session) => void) {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		const session = await getSession({ req });
		if (session === null) {
			return res.status(401).send("Unauthorized access");
		}
		return handler(req, res, session);
	};
}

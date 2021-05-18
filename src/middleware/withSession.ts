import { NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { APIRequestWithSession } from "../types/request";

export default function withSession(handler: (req, res) => void) {
	return async (req: APIRequestWithSession, res: NextApiResponse) => {
		const session = await getSession({ req });
		if (session === null) {
			return res.status(401).send("Unauthorized access");
		}
		req.session = session;
		return handler(req, res);
	};
}

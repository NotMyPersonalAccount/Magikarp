import { Class, ClassEnrollment } from "@prisma/client";
import { NextApiRequest } from "next";
import { Session } from "next-auth";

export interface APIRequestWithSession extends NextApiRequest {
	session: Session;
}

export interface APIRequestWithClass extends APIRequestWithSession {
	class: Class & { enrollment: ClassEnrollment[] };
}

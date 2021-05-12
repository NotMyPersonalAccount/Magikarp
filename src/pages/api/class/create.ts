import withJoi from "../../../middleware/withJoi";
import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import withSession from "../../../middleware/withSession";
import { ClassRoles } from "@prisma/client";
import { Session } from "next-auth";
import prisma from "../../../prisma/prisma";

export default withJoi(
	withSession(async function handler(
		req: NextApiRequest,
		res: NextApiResponse,
		session: Session
	) {
		const { id } = session.user;
		await prisma.class.create({
			data: {
				name: req.body.name,
				description: req.body.description,
				enrollment: {
					create: {
						user: {
							connect: {
								id
							}
						},
						role: ClassRoles.TEACHER
					}
				}
			}
		});
		return res.status(200).send("OK");
	}),
	Joi.object({
		name: Joi.string().min(1).max(32).required(),
		description: Joi.string().min(1).max(128)
	})
);

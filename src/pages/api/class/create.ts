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
		return res.status(200).send(
			await prisma.classEnrollment.create({
				data: {
					role: ClassRoles.TEACHER,
					user: {
						connect: { id: session.user.id }
					},
					class: {
						create: {
							name: req.body.name,
							description: req.body.description
						}
					}
				},
				include: {
					class: { include: { enrollment: { include: { user: true } } } }
				}
			})
		);
	}),
	Joi.object({
		name: Joi.string().min(1).max(32).required(),
		description: Joi.string().min(1).max(128)
	})
);

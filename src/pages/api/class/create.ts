import withJoi from "../../../middleware/withJoi";
import Joi from "joi";
import { NextApiResponse } from "next";
import withSession from "../../../middleware/withSession";
import { ClassRoles } from "@prisma/client";
import prisma from "../../../prisma/prisma";
import { APIRequestWithSession } from "../../../types/request";

export default withJoi(
	withSession(async function handler(
		req: APIRequestWithSession,
		res: NextApiResponse
	) {
		return res.status(200).send(
			await prisma.classEnrollment.create({
				data: {
					role: ClassRoles.TEACHER,
					user: {
						connect: { id: req.session.user.id }
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

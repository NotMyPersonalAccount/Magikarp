import withJoi from "../../../../middleware/withJoi";
import Joi from "joi";
import { NextApiResponse } from "next";
import { APIRequestWithClass } from "../../../../types/request";
import withClass from "../../../../middleware/withClass";
import { ClassRoles } from "@prisma/client";
import prisma from "../../../../prisma/prisma";

export default withJoi(
	withClass(async function handler(
		req: APIRequestWithClass,
		res: NextApiResponse
	) {
		const enrollment = req.class.enrollment.find(
			e => e.userId === req.session.user.id
		);
		if (enrollment?.role !== ClassRoles.TEACHER)
			return res.status(401).send("Must be teacher");

		return res.status(200).send(
			await prisma.classInvites.create({
				data: {
					class: {
						connect: { id: req.body.class_id }
					},
					limit: req.body.limit,
					expiresAt: req.body.expires_at
				}
			})
		);
	}),
	Joi.object({
		class_id: Joi.string().length(25).required(),
		limit: Joi.number(),
		expires_at: Joi.date().iso().greater("now")
	})
);

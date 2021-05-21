import withClass from "../../../../middleware/withClass";
import Joi from "joi";
import withJoi from "../../../../middleware/withJoi";
import { ClassRoles } from "@prisma/client";
import prisma from "../../../../prisma/prisma";
import { APIRequestWithClass } from "../../../../types/request";
import { NextApiResponse } from "next";

export default withJoi(
	withClass(async function handler(
		req: APIRequestWithClass,
		res: NextApiResponse
	) {
		const enrollment = req.class.enrollment.find(
			e => e.userId === req.session.user.id
		);
		if (enrollment?.role !== ClassRoles.STUDENT)
			return res.status(401).send("Must be student");

		return res.status(200).send(
			await prisma.classAttendance.create({
				data: {
					class: {
						connect: { id: req.body.class_id }
					},
					user: {
						connect: { id: req.session.user.id }
					},
					synchronous: req.body.synchronous,
					note: req.body.content
				}
			})
		);
	}),
	Joi.object({
		class_id: Joi.string().length(25).required(),
		synchronous: Joi.boolean().required(),
		content: Joi.string()
	})
);

import withJoi from "../../../middleware/withJoi";
import Joi from "joi";
import { NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";
import { ClassRoles } from "@prisma/client";
import { APIRequestWithClass } from "../../../types/request";
import withClass from "../../../middleware/withClass";

export default withJoi(
	withClass(async function handler(
		req: APIRequestWithClass,
		res: NextApiResponse
	) {
		const classId = req.class.id;
		const enrollment = req.class.enrollment.find(
			e => e.userId === req.session.user.id
		);
		if (enrollment === null || enrollment.role !== ClassRoles.TEACHER)
			return res.status(401).send("Must be teacher");

		return res
			.status(200)
			.send(
				await prisma.$transaction([
					prisma.classPosts.deleteMany({ where: { classId } }),
					prisma.classEnrollment.deleteMany({ where: { classId } }),
					prisma.class.delete({ where: { id: classId } })
				])
			);
	}),
	Joi.object({ id: Joi.string().length(25).required() })
);

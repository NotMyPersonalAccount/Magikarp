import withSession from "../../../middleware/withSession";
import withJoi from "../../../middleware/withJoi";
import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import prisma from "../../../prisma/prisma";
import { ClassRoles } from "@prisma/client";

export default withJoi(
	withSession(async function handler(
		req: NextApiRequest,
		res: NextApiResponse,
		session: Session
	) {
		const { id } = req.body;

		const _class = await prisma.class.findFirst({
			where: { id },
			include: { enrollment: true }
		});
		if (_class === null) return res.status(404).send("Class does not exist");

		const enrollment = _class.enrollment.find(
			e => e.userId === session.user.id
		);
		if (enrollment === null || enrollment.role !== ClassRoles.TEACHER)
			return res.status(401).send("Must be teacher");

		return res
			.status(200)
			.send(
				await prisma.$transaction([
					prisma.classEnrollment.deleteMany({ where: { classId: id } }),
					prisma.class.delete({ where: { id } })
				])
			);
	}),
	Joi.object({ id: Joi.string().length(25).required() })
);

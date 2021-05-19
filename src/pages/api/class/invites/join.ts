import withJoi from "../../../../middleware/withJoi";
import withSession from "../../../../middleware/withSession";
import Joi from "joi";
import { NextApiResponse } from "next";
import { APIRequestWithSession } from "../../../../types/request";
import prisma from "../../../../prisma/prisma";
import { ClassRoles } from "@prisma/client";

export default withJoi(
	withSession(async function handler(
		req: APIRequestWithSession,
		res: NextApiResponse
	) {
		const invite = await prisma.classInvites.findFirst({
			where: { id: req.body.invite },
			include: { class: { include: { enrollment: true } } }
		});
		if (invite === null) return res.status(404).send("Invalid invite");
		if (
			(invite.limit && invite.used >= invite.limit) ||
			(invite.expiresAt && invite.expiresAt < new Date())
		) {
			prisma.classInvites.delete({ where: { id: invite.id } });
			return res.status(404).send("Invalid invite");
		}

		const enrollment = invite.class.enrollment.find(
			e => e.userId === req.session.user.id
		);
		if (enrollment) return res.status(418).send("Already in class");

		return res.status(200).send(
			await prisma.$transaction([
				prisma.classEnrollment.create({
					data: {
						role: ClassRoles.STUDENT,
						user: { connect: { id: req.session.user.id } },
						class: { connect: { id: invite.classId } }
					}
				}),
				prisma.classInvites.update({
					where: { id: invite.id },
					data: { used: { increment: 1 } }
				})
			])
		);
	}),
	Joi.object({ invite: Joi.string().length(25).required() })
);

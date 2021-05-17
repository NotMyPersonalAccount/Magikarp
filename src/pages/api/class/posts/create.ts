import withJoi from "../../../../middleware/withJoi";
import withSession from "../../../../middleware/withSession";
import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import prisma from "../../../../prisma/prisma";

export default withJoi(
	withSession(async function handler(
		req: NextApiRequest,
		res: NextApiResponse,
		session: Session
	) {
		const { class_id } = req.body;

		const _class = await prisma.class.findFirst({
			where: { id: class_id },
			include: { enrollment: true }
		});
		if (_class === null) return res.status(404).send("Class does not exist");

		const enrollment = _class.enrollment.find(
			e => e.userId === session.user.id
		);
		if (enrollment === null) return res.status(401).send("Must be in class");

		return res.status(200).send(
			await prisma.classPost.create({
				data: {
					content: req.body.content,
					class: { connect: { id: class_id } },
					user: { connect: { id: session.user.id } }
				},
				include: { user: true }
			})
		);
	}),
	Joi.object({
		class_id: Joi.string().length(25).required(),
		content: Joi.string().min(1).max(1024).required()
	})
);

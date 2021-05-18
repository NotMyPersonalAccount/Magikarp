import withJoi from "../../../../middleware/withJoi";
import Joi from "joi";
import { NextApiResponse } from "next";
import prisma from "../../../../prisma/prisma";
import { APIRequestWithClass } from "../../../../types/request";
import withClass from "../../../../middleware/withClass";

export default withJoi(
	withClass(async function handler(
		req: APIRequestWithClass,
		res: NextApiResponse
	) {
		const enrollment = req.class.enrollment.find(
			e => e.userId === req.session.user.id
		);
		if (enrollment === null) return res.status(401).send("Must be in class");

		return res.status(200).send(
			await prisma.classPosts.create({
				data: {
					content: req.body.content,
					class: { connect: { id: req.class.id } },
					user: { connect: { id: req.session.user.id } }
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

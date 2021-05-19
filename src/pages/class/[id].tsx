import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import prisma from "../../prisma/prisma";
import ClassPosts from "../../components/class/ClassPosts";
import { getSession } from "next-auth/client";
import { requestLogin, sendError } from "../../utils/error_handling";

export default function Class(props): ReactElement {
	return (
		<>
			<header className="bg-red-200 max-w-screen-lg xl:max-w-screen-xl mx-auto my-4 pb-12">
				<h1 className="p-4 text-3xl text-white">{props.class.name}</h1>
			</header>
			<section className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
				<ClassPosts class={props.class} />
			</section>
		</>
	);
}

export const getServerSideProps: GetServerSideProps<object, { id: string }> =
	async ({ params, req }) => {
		if (params.id.length !== 25)
			return sendError("The provided ID must be 25 characters in length.");

		const _class = await prisma.class.findFirst({
			where: { id: params.id },
			include: {
				enrollment: { include: { user: true } },
				posts: { include: { user: true } }
			}
		});
		if (_class === null)
			return sendError("The requested class does not exist.");

		const session = await getSession({ req });
		if (!session) return requestLogin();
		if (
			!_class.enrollment.find(
				enrollment => enrollment.userId === session.user.id
			)
		)
			return sendError("You are not a member of the requested class.");

		return { props: { class: JSON.parse(JSON.stringify(_class)) } };
	};

import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import prisma from "../../prisma/prisma";
import ClassPosts from "../../components/class/ClassPosts";

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
	async ({ params }) => {
		if (params.id.length !== 25)
			throw new Error("IDs must be 25 characters in length");

		const _class = await prisma.class.findFirst({
			where: { id: params.id },
			include: {
				enrollment: { include: { user: true } },
				posts: { include: { user: true } }
			}
		});
		if (_class === null) throw new Error("Class does not exist");

		return { props: { class: JSON.parse(JSON.stringify(_class)) } };
	};

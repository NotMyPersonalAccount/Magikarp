import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import prisma from "../../prisma/prisma";
import { getSession } from "next-auth/client";
import ClassCard from "../../components/home/ClassCard";

export default function Home(props): ReactElement {
	return (
		<div className="container my-12 mx-auto px-4 md:px-12">
			<div className="flex flex-wrap -mx-1 lg:-mx-4">
				{props.enrollment.map(enrollment => {
					const _class = enrollment.class;
					const teacher = _class.enrollment.find(
						enrollment => enrollment.role === ClassRoles.TEACHER
					).user;
					return (
						<ClassCard key={enrollment.class.id} class={enrollment.class} />
					);
				})}
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = await getSession({ req });
	const enrollment = await prisma.classEnrollment.findMany({
		where: { userId: session.user.id },
		include: { class: { include: { enrollment: { include: { user: true } } } } }
	});
	return { props: { enrollment: JSON.parse(JSON.stringify(enrollment)) } };
};

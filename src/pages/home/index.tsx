import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import prisma from "../../prisma/prisma";
import { getSession } from "next-auth/client";
import { ClassRoles } from "@prisma/client";
import Link from "next/link";

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
						<div
							key={_class.id}
							className="my-1 px-1 w-full md:w-1/3 lg:my-4 lg:px-4 lg:w-1/4">
							<div className="rounded-lg shadow-lg overflow-hidden">
								<div className="m-4">
									<Link href={`/class/${_class.id}`}>
										<a className="text-lg">{_class.name}</a>
									</Link>
									<p>{_class.description}</p>
									<p>{teacher.name}</p>
								</div>
								<img
									className="rounded-full h-10 w-10 float-right m-3"
									src={teacher.image}
								/>
							</div>
						</div>
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

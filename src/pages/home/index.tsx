import { ReactElement, useState } from "react";
import { GetServerSideProps } from "next";
import prisma from "../../prisma/prisma";
import { getSession } from "next-auth/client";
import ClassCard from "../../components/home/ClassCard";
import AddClassModal from "../../components/modals/AddClassModal";
import { requestLogin } from "../../utils/error_handling";
import { HomePageProps } from "../../types/props";
import { ClassRoles } from "@prisma/client";

export default function Home(props: HomePageProps): ReactElement {
	const [enrollment, setEnrollment] = useState(props.enrollment);
	const [addingClass, setAddingClass] = useState(false);

	return (
		<div className="pt-5 pl-4 sm:pl-6">
			<div className="flex flex-wrap">
				{enrollment.map(e => {
					return <ClassCard key={e.class.id} class={e.class} />;
				})}
			</div>
			<div
				className="flex flex-wrap content-center justify-center cursor-pointer rounded-full w-10 h-10 bg-gray-100 hover:bg-gray-200 my-2"
				onClick={() => setAddingClass(true)}>
				<span>+</span>
			</div>
			{addingClass && (
				<AddClassModal
					addClass={newEnrollment => {
						setEnrollment(e => [...e, newEnrollment]);
					}}
					close={() => setAddingClass(false)}
				/>
			)}
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = await getSession({ req });
	if (!session) return requestLogin();

	const enrollment = await prisma.classEnrollment.findMany({
		where: { userId: session.user.id },
		include: {
			class: {
				include: {
					enrollment: {
						include: { user: true },
						where: { role: ClassRoles.TEACHER }
					}
				}
			}
		}
	});
	return { props: { enrollment: JSON.parse(JSON.stringify(enrollment)) } };
};

import { ReactElement, useState } from "react";
import { GetServerSideProps } from "next";
import prisma from "../../prisma/prisma";
import { getSession } from "next-auth/client";
import ClassCard from "../../components/home/ClassCard";
import AddClassModal from "../../components/modals/AddClassModal";

export default function Home(props): ReactElement {
	const [enrollment, setEnrollment] = useState(props.enrollment);
	const [addingClass, setAddingClass] = useState(false);

	return (
		<div className="container my-12 mx-auto px-4 md:px-12">
			<div className="flex flex-wrap -mx-1 lg:-mx-4">
				{enrollment.map(e => {
					return <ClassCard key={e.class.id} class={e.class} />;
				})}
			</div>
			<div
				className="flex flex-wrap content-center justify-center cursor-pointer rounded-full w-10 h-10 bg-gray-100"
				onClick={() => setAddingClass(true)}>
				<span>+</span>
			</div>
			<AddClassModal
				isOpen={addingClass}
				addClass={newEnrollment => {
					setEnrollment(e => [...e, newEnrollment]);
				}}
				close={() => setAddingClass(false)}
			/>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = await getSession({ req });
	if (session === null) throw new Error("Must be logged in");

	const enrollment = await prisma.classEnrollment.findMany({
		where: { userId: session.user.id },
		include: { class: { include: { enrollment: { include: { user: true } } } } }
	});
	return { props: { enrollment: JSON.parse(JSON.stringify(enrollment)) } };
};

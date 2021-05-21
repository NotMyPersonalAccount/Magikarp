import { GetServerSideProps } from "next";
import { ReactElement, useEffect, useState } from "react";
import prisma from "../../prisma/prisma";
import ClassPosts from "../../components/class/ClassPosts";
import { getSession, useSession } from "next-auth/client";
import { requestLogin, sendError } from "../../utils/error_handling";
import { ClassHolder, SSRClassPageParams } from "../../types/props";
import { ClassRoles } from "@prisma/client";
import Button from "../../components/Button";
import InviteModal from "../../components/modals/InviteModal";
import { useNavbarStore } from "../../stores/useNavbarStore";

export default function Class(props: ClassHolder): ReactElement {
	const [session] = useSession();
	const [inviteModal, setInviteModal] = useState(false);

	const setClassId = useNavbarStore(state => state.setClassId);
	useEffect(() => {
		setClassId(props.class.id);
		return () => setClassId(undefined);
	}, [setClassId, props.class]);

	return (
		<>
			<header className="bg-red-200 max-w-screen-lg xl:max-w-screen-xl mx-auto my-4 pb-12">
				<h1 className="p-4 text-3xl text-white">{props.class.name}</h1>
				{props.class.enrollment.find(
					e => e.userId === session?.user?.id
				)?.role === ClassRoles.TEACHER && (
					<Button
						className="ml-4"
						onClick={() => setInviteModal(true)}>
						Invite
					</Button>
				)}
			</header>
			<section className="max-w-screen-lg xl:max-w-screen-xl mx-auto px-3 sm:px-0">
				<ClassPosts class={props.class} />
			</section>
			{inviteModal && (
				<InviteModal
					close={() => setInviteModal(false)}
					class={props.class}
				/>
			)}
		</>
	);
}

export const getServerSideProps: GetServerSideProps<
	Record<string, unknown>,
	SSRClassPageParams
> = async ({ params, req }) => {
	if (params.id.length !== 25)
		return sendError("The provided ID must be 25 characters in length.");

	const _class = await prisma.class.findFirst({
		where: { id: params.id },
		include: {
			invites: true,
			enrollment: { include: { user: true } },
			posts: { include: { user: true } }
		}
	});
	if (_class === null)
		return sendError("The requested class does not exist.");

	const session = await getSession({ req });
	if (!session) return requestLogin();
	const sessionEnrollment = _class.enrollment.find(
		enrollment => enrollment.userId === session.user.id
	);
	if (!sessionEnrollment)
		return sendError("You are not a member of the requested class.");
	if (sessionEnrollment.role !== ClassRoles.TEACHER) delete _class.invites;
	return { props: { class: JSON.parse(JSON.stringify(_class)) } };
};

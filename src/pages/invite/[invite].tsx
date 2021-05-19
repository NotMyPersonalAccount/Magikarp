import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import prisma from "../../prisma/prisma";
import { useSession } from "next-auth/client";
import Button from "../../components/Button";
import CentralHomeButton from "../../components/central/CentralHomeButton";
import { useRouter } from "next/router";
import CentralInfo from "../../components/central/CentralInfo";

export default function Invite(props): ReactElement {
	const router = useRouter();
	const [session] = useSession();

	return (
		<CentralInfo>
			{props.invite ? (
				<div>
					<h1 className="text-2xl">Classroom Invitation</h1>
					{props.invite.class.enrollment.find(
						enrollment => enrollment.userId === session?.user?.id
					) ? (
						<>
							<p>You are already a member of {props.invite.class.name}</p>
							<CentralHomeButton />
						</>
					) : (
						<>
							<p>You have been invited to {props.invite.class.name}.</p>
							{session ? (
								<div className="float-right mt-2">
									<Button
										onClick={async () => {
											const response = await fetch("/api/class/invites/join", {
												method: "POST",
												headers: { "Content-Type": "application/json" },
												body: JSON.stringify({ invite: props.invite.id })
											});
											if (response.status === 200) {
												router.push("/home");
											}
										}}>
										Join {props.invite.class.name}
									</Button>
								</div>
							) : (
								<p className="mt-3 font-semibold">
									Sign in to your account to continue!
								</p>
							)}
						</>
					)}
				</div>
			) : (
				<>
					<h1 className="text-2xl">Invite Invalid</h1>
					<p>This invite may have expired or been entirely used up.</p>
					<CentralHomeButton />
				</>
			)}
		</CentralInfo>
	);
}

export const getServerSideProps: GetServerSideProps<
	object,
	{ invite: string }
> = async ({ params }) => {
	return {
		props: {
			invite: JSON.parse(
				JSON.stringify(
					await prisma.classInvites.findFirst({
						where: { id: params.invite },
						include: {
							class: { include: { enrollment: true } }
						}
					})
				)
			)
		}
	};
};

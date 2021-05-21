import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import Button from "../Button";
import dayjs from "dayjs";
import { post } from "../../utils/fetch";
import { InviteModalProps } from "../../types/props";
import FormSelect from "../FormSelect";

export default function InviteModal(props: InviteModalProps): ReactElement {
	const [invites, setInvites] = useState(props.class.invites);
	const [generatingInvite, setGeneratingInvite] = useState(false);
	const latestInvite = useMemo(() => {
		const validInvites = invites.filter(
			i =>
				!i.expiresAt ||
				(new Date() < new Date(i.expiresAt) &&
					(!i.limit || i.limit > i.used))
		);
		return validInvites[validInvites.length - 1];
	}, [invites]);

	const [duration, setDuration] = useState(10080);
	const [limit, setLimit] = useState(0);

	const generateInvite = useCallback(() => {
		if (!generatingInvite) {
			setGeneratingInvite(true);
			(async () => {
				const response = await post("/api/class/invites/create", {
					class_id: props.class.id,
					duration: duration || undefined,
					limit: limit || undefined
				});
				if (response.status === 200) {
					const newInvite = await response.json();
					setInvites(existingInvites => [
						...existingInvites,
						newInvite
					]);
				}
				setGeneratingInvite(false);
			})();
		}
	}, [duration, limit, generatingInvite]);
	useEffect(() => !latestInvite && generateInvite(), [latestInvite]);

	return (
		<Modal title={`Invite to ${props.class.name}`}>
			<textarea
				className="h-10"
				value={
					latestInvite && !generatingInvite
						? `${
								typeof window !== "undefined" &&
								window.location.origin
						  }/invite/${latestInvite.id}`
						: "Generating..."
				}
				readOnly
			/>
			{latestInvite && (
				<p>
					{latestInvite.expiresAt
						? `This invite expires in ${dayjs(
								latestInvite.expiresAt
						  ).fromNow(true)}.`
						: "This invite will never expire."}
				</p>
			)}
			<form className="my-2">
				<FormSelect
					label="Expires"
					onChange={value => setDuration(parseInt(value))}>
					<option value={0}>Never</option>
					<option value={30}>30 minutes</option>
					<option value={60}>1 hour</option>
					<option value={360}>6 hours</option>
					<option value={720}>12 hours</option>
					<option value={1440}>1 day</option>
					<option value={10080}>7 days</option>
				</FormSelect>
				<FormSelect
					label="Limit"
					onChange={value => setLimit(parseInt(value))}>
					<option value={0}>Never</option>
					<option value={1}>1</option>
					<option value={5}>5</option>
					<option value={10}>10</option>
					<option value={25}>25</option>
					<option value={50}>50</option>
					<option value={100}>100</option>
				</FormSelect>
			</form>
			<div className="float-right">
				<Button className="m-1" onClick={props.close}>
					Close
				</Button>
				<Button className="m-1" onClick={generateInvite}>
					Generate New Invite
				</Button>
			</div>
		</Modal>
	);
}

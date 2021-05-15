import { ReactElement, useState } from "react";
import Modal from "./Modal";
import Button from "../Button";
import FormInput from "../FormInput";

export default function AddClassModal(props): ReactElement {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [error, setError] = useState("");
	const [submitting, setSubmitting] = useState(false);

	return (
		<Modal isOpen={props.isOpen} title="Add New Class">
			{error && <p className="text-red-400 text-lg">{error}</p>}
			<form className="my-2">
				<FormInput label="Name" onChange={setName} />
				<FormInput label="Description" onChange={setDescription} />
			</form>
			<div className="float-right">
				<Button className="m-1" onClick={submitting ? null : props.close}>
					Close
				</Button>
				<Button
					className="m-1"
					onClick={async () => {
						if (!submitting) {
							setSubmitting(true);
							const response = await fetch("/api/class/create", {
								method: "POST",
								headers: {
									"Content-Type": "application/json"
								},
								body: JSON.stringify({
									name,
									description: description === "" ? undefined : description
								})
							});
							if (response.status !== 200) {
								setError(await response.text());
							} else {
								setError("");
								setName("");
								setDescription("");
								props.addClass(await response.json());
								props.close();
							}
							setSubmitting(false);
						}
					}}>
					Add
				</Button>
			</div>
		</Modal>
	);
}

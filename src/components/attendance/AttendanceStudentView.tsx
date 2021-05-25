import { ReactElement, useState } from "react";
import dayjs from "dayjs";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import Button from "../Button";
import { post } from "../../utils/fetch";
import { AttendancePageProps } from "../../types/props";

export default function AttendanceStudentView(
	props: AttendancePageProps
): ReactElement {
	const [attendance, setAttendance] = useState(props.attendance);
	const [note, setNote] = useState("");
	const [synchronous, setSynchronous] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");

	return (
		<div className="m-4">
			<h1 className="text-xl my-4">Checkin</h1>
			{error && <p className="text-red-400 text-lg">{error}</p>}
			<form>
				<FormInput label="Note" onChange={setNote} />
				<FormSelect
					label="Scope"
					onChange={value => setSynchronous(value === "sync")}>
					<option value="async">Asynchronous</option>
					<option value="sync">Synchronous</option>
				</FormSelect>
			</form>
			<Button
				className="mt-4"
				onClick={async () => {
					if (!submitting) {
						setSubmitting(true);
						const response = await post(
							"/api/class/attendance/create",
							{
								class_id: props.class.id,
								synchronous,
								content: note || undefined
							}
						);
						if (response.status === 200) {
							const newAttendance = await response.json();
							setAttendance(a => [newAttendance, ...a]);
							setNote("");
							setError("");
						} else {
							setError(await response.text());
						}
						setSubmitting(false);
					}
				}}>
				Submit
			</Button>
			<h1 className="text-xl my-4">Your last 10 checkins</h1>
			<table>
				<thead>
					<tr>
						<th>Time</th>
						<th>Note</th>
						<th>Synchronous</th>
					</tr>
				</thead>
				<tbody>
					{attendance.map(a => {
						return (
							<tr key={a.id}>
								<td>
									{a
										? dayjs(a.createdAt).format(
												"MM/DD/YYYY h:mm a"
										  )
										: "N/A"}
								</td>
								<td>{a?.note || "N/A"}</td>
								<td>
									{a ? (a.synchronous ? "Yes" : "No") : "N/A"}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

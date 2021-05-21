import { ReactElement } from "react";
import dayjs from "dayjs";
import { ClassRoles } from "@prisma/client";
import { AttendancePageProps } from "../../types/props";

export default function AttendanceTeacherView(
	props: AttendancePageProps
): ReactElement {
	return (
		<div className="m-4">
			<h1 className="text-xl my-4">Student Checkins</h1>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Time</th>
						<th>Note</th>
						<th>Synchronous</th>
					</tr>
				</thead>
				<tbody>
					{props.class.enrollment
						.filter(e => e.role === ClassRoles.STUDENT)
						.map(e => {
							const attendance = props.attendance.find(
								a => a.userId === e.userId
							);
							return (
								<tr key={e.userId}>
									<td>{e.user.name}</td>
									<td>
										{attendance
											? dayjs(
													attendance.createdAt
											  ).format("h:mm a")
											: "N/A"}
									</td>
									<td>{attendance?.note || "N/A"}</td>
									<td>
										{attendance
											? attendance.synchronous
												? "Yes"
												: "No"
											: "N/A"}
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
}

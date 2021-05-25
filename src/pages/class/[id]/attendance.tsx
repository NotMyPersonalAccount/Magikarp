import { ReactElement, useEffect } from "react";
import { useNavbarStore } from "../../../stores/useNavbarStore";
import { GetServerSideProps } from "next";
import { AttendancePageProps, SSRClassPageParams } from "../../../types/props";
import { requestLogin, sendError } from "../../../utils/error_handling";
import prisma from "../../../prisma/prisma";
import { getSession, useSession } from "next-auth/client";
import { ClassRoles } from "@prisma/client";
import AttendanceTeacherView from "../../../components/attendance/AttendanceTeacherView";
import AttendanceStudentView from "../../../components/attendance/AttendanceStudentView";
import dayjs from "dayjs";

export default function Attendance(props: AttendancePageProps): ReactElement {
	const [session] = useSession();
	const isTeacher = props.class.enrollment !== undefined;

	const setClassId = useNavbarStore(state => state.setClassId);
	useEffect(() => {
		setClassId(props.class.id);
		return () => setClassId(undefined);
	}, [setClassId, props.class]);

	return (
		<>
			{isTeacher ? (
				<AttendanceTeacherView
					class={props.class}
					attendance={props.attendance}
				/>
			) : (
				<AttendanceStudentView
					class={props.class}
					attendance={props.attendance}
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
			enrollment: { include: { user: true } }
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

	let attendance;
	if (sessionEnrollment.role === ClassRoles.TEACHER) {
		attendance = await prisma.classAttendance.findMany({
			where: {
				classId: _class.id,
				createdAt: {
					gte: dayjs().startOf("day").toDate()
				}
			}
		});
	} else {
		attendance = await prisma.classAttendance.findMany({
			where: {
				classId: _class.id,
				userId: session.user.id
			},
			orderBy: { createdAt: "desc" },
			take: 10
		});
		delete _class.enrollment;
	}
	return {
		props: {
			class: JSON.parse(JSON.stringify(_class)),
			attendance: JSON.parse(JSON.stringify(attendance))
		}
	};
};

import { ReactElement } from "react";
import Link from "next/link";
import { ClassRoles } from "@prisma/client";
import { ClassHolder } from "../../types/props";

export default function ClassCard(props: ClassHolder): ReactElement {
	const _class = props.class;
	const teacher = _class.enrollment.find(
		enrollment => enrollment.role === ClassRoles.TEACHER
	).user;

	return (
		<div
			key={_class.id}
			className="flex mb-4 mr-2 lg:mr-4 p-4 bg-red-50 rounded-lg shadow-lg hover:shadow-xl w-80 h-40 transform hover:scale-105 hover:translate-y-2 transition duration-300 ease-in-out">
			<div className="flex-grow min-w-0">
				<Link href={`/class/${_class.id}`}>
					<a className="text-xl">
						<p className="overflow-ellipsis overflow-hidden whitespace-nowrap">
							{_class.name}
						</p>
					</a>
				</Link>
				<p>{_class.description}</p>
				<p>{teacher.name}</p>
			</div>
			<img
				className="self-end rounded-full h-10 w-10 m-2"
				src={teacher.image}
			/>
		</div>
	);
}

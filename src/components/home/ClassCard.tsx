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
			className="my-1 px-1 w-full md:w-1/3 lg:my-4 lg:px-4 lg:w-1/4">
			<div className="rounded-lg shadow-lg overflow-hidden">
				<div className="m-4">
					<Link href={`/class/${_class.id}`}>
						<a className="text-lg">{_class.name}</a>
					</Link>
					<p>{_class.description}</p>
					<p>{teacher.name}</p>
				</div>
				<img
					className="rounded-full h-10 w-10 float-right m-3"
					src={teacher.image}
				/>
			</div>
		</div>
	);
}

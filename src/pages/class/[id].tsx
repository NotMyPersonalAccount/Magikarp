import { connectToDatabase } from "../../utils/mongodb";
import { ObjectID } from "mongodb";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import { ClassProp } from "../../types/class";

export default function Class(props: ClassProp): ReactElement {
	return (
		<>
			<p>class name: {props.class.name}</p>
			<p>class description: {props.class.description}</p>
			<p>
				class created at:{" "}
				{dayjs
					.unix(props.class.created_at / 1000)
					.format("YYYY-MM-DD HH:mm:ss")}
			</p>
		</>
	); //TODO: Class page
}

export const getServerSideProps: GetServerSideProps<
	object,
	{ id: string }
> = async ({ params }) => {
	if (params.id.length !== 24)
		throw new Error("IDs must be 24 characters in length");

	const { db } = await connectToDatabase();
	const _class = await db
		.collection("classes")
		.findOne({ _id: new ObjectID(params.id) }); //class is a reserved keyword

	if (_class === null) return { notFound: true };

	_class._id = _class._id.toString();
	return { props: { class: _class } };
};

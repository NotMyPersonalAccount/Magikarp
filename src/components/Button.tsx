import { ReactElement } from "react";

export default function Button(props): ReactElement {
	return (
		<button
			onClick={props.onClick}
			className={`${props.className} bg-red-500 hover:bg-red-600 focus:outline-none rounded-xl shadow-lg px-4 py-2 text-white text-bold`}>
			{props.children}
		</button>
	);
}

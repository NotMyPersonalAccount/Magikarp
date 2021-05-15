import { ReactElement } from "react";
import ReactModal from "react-modal";

export default function Modal(props): ReactElement {
	return (
		<ReactModal
			className="w-11/12 sm:w-9/12 md:w-7/12 lg:w-5/12 p-4 bg-white rounded shadow-xl overflow-hidden fixed top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4"
			isOpen={props.isOpen}
			ariaHideApp={false}>
			<h1 className="text-lg font-bold">{props.title}</h1>
			{props.children}
		</ReactModal>
	);
}

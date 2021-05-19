import { ReactElement } from "react";

export default function CentralInfo(props): ReactElement {
	return (
		<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
			<div className="bg-gray-100 rounded-md p-5 shadow-md overflow-hidden">
				{props.children}
			</div>
		</div>
	);
}

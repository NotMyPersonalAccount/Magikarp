import { ReactElement } from "react";
import { LayoutProps } from "../../types/props";

export default function CentralInfo(props: LayoutProps): ReactElement {
	return (
		<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8/12 sm:w-7/12 md:w-6/12 lg:w-5/12 xl:w-4/12">
			<div className="bg-gray-100 rounded-md p-5 shadow-md overflow-hidden">
				{props.children}
			</div>
		</div>
	);
}

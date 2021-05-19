import { ReactElement } from "react";
import Navbar from "./Navbar";
import { LayoutProps } from "../types/props";

export default function Layout(props: LayoutProps): ReactElement {
	return (
		<>
			<Navbar />
			{props.children}
		</>
	);
}

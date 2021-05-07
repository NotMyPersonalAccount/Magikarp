import { ReactElement } from "react";
import Navbar from "./Navbar";

export default function Layout(props): ReactElement {
	return (
		<>
			<Navbar />
			{props.children}
		</>
	);
}

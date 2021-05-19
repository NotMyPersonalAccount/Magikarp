import { ReactElement } from "react";
import Link from "next/link";
import Button from "../Button";

export default function CentralHomeButton(): ReactElement {
	return (
		<div className="float-right mt-2">
			<Link href="/home">
				<a>
					<Button>Go Home</Button>
				</a>
			</Link>
		</div>
	);
}

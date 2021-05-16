import { ReactElement } from "react";
import Link from "next/link";
import Button from "../components/Button";

export default function Home(): ReactElement {
	return (
		<header className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
			<div className="px-4 sm:px-6 md:px-8">
				<div className="mt-12 mb-5">
					<p className="text-4xl text-red-400 font-mono font-semibold">
						magikarp
					</p>
				</div>
				<h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mt-10 mb-8">
					Easier attendance and communication for teachers & students.
				</h1>
				<p className="text-2xl my-2">
					Submit attendance for all your classes. Communicate with your
					classmates & teachers. All within one platform. For free. Created by a
					moron with terrible design choices.
				</p>
				<Link href="/home">
					<Button className="my-2">Go to Home</Button>
				</Link>
			</div>
		</header>
	);
}

import { ReactElement } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import Button from "./Button";
import Link from "next/link";
import { useNavbarStore } from "../stores/useNavbarStore";

export default function Navbar(): ReactElement {
	const currentClassId = useNavbarStore(state => state.classId);
	const [session, loading] = useSession();

	return (
		<>
			<nav className="flex justify-between bg-gray-50 shadow-sm items-center">
				<p className="text-2xl text-red-400 font-mono font-semibold px-4 py-2">
					magikarp
				</p>
				{currentClassId && (
					<div className="hidden sm:block">
						<NavbarLinks />
					</div>
				)}
				{loading ? null : session ? (
					<img
						className="profile-picture cursor-pointer m-4"
						src={session.user.image}
						onClick={() => signOut()} //TODO: Quit being lazy and make a menu for settings/sign out
					/>
				) : (
					<Button
						className="mr-4 my-2"
						onClick={() => signIn("google")}>
						Login
					</Button>
				)}
			</nav>
			{currentClassId && (
				<nav className="flex sm:hidden justify-between bg-gray-50 shadow-sm items-center px-4 py-2">
					<NavbarLinks />
				</nav>
			)}
		</>
	);
}

function NavbarLinks(): ReactElement {
	const currentClassId = useNavbarStore(state => state.classId);
	return (
		<>
			<Link href="/home">
				<a className="navbar-link">Home</a>
			</Link>
			<Link href={`/class/${currentClassId}`}>
				<a className="navbar-link">Discussion</a>
			</Link>
			<Link href={`/class/${currentClassId}/attendance`}>
				<a className="navbar-link">Attendance</a>
			</Link>
		</>
	);
}

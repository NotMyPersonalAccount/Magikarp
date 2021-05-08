import { ReactElement } from "react";
import { useSession, signIn, signOut } from "next-auth/client";

export default function Navbar(): ReactElement {
	const [session, loading] = useSession();
	return (
		<nav className="flex bg-gray-50 shadow-sm items-center">
			<p className="text-2xl text-red-400 px-4 py-2 font-mono font-semibold">
				magikarp
			</p>
			{loading ? null : session ? (
				<img
					className="cursor-pointer ml-auto rounded-full h-10 w-10 m-4"
					src={session.user.image}
					onClick={() => signOut()} //TODO: Quit being lazy and make a menu for settings/sign out
				/>
			) : (
				<button
					className="bg-red-500 hover:bg-red-600 focus:outline-none rounded-xl shadow-lg px-4 py-2 ml-auto mr-4 my-2 text-white text-bold"
					onClick={() => signIn("google")}>
					Login
				</button>
			)}
		</nav>
	);
}

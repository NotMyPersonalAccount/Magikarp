import { ReactElement } from "react";
import { useSession, signIn, signOut } from "next-auth/client";

export default function Navbar(): ReactElement {
	const [session, loading] = useSession();
	return (
		<nav className="dark bg-gray-100">
			<button onClick={() => (loading ? null : session ? signOut() : signIn())}>
				{loading ? "Loading" : session ? "Logout" : "Login"}
			</button>
		</nav>
	); //TODO: Full & proper navbar
}

import "tailwindcss/tailwind.css";
import "../styles/index.css";
import Layout from "../components/Layout";
import { Provider, signIn } from "next-auth/client";
import CentralInfo from "../components/central/CentralInfo";
import CentralHomeButton from "../components/central/CentralHomeButton";
import { ReactElement } from "react";
import { AppProps } from "next/app";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function MyApp({ Component, pageProps }: AppProps): ReactElement {
	if (typeof window !== "undefined" && pageProps.request_login)
		signIn("google");

	return pageProps.request_login ? (
		<></>
	) : (
		<Provider session={pageProps.session}>
			<Layout>
				{pageProps.error ? (
					<CentralInfo>
						<h1 className="font-semibold text-2xl">Error!</h1>
						<p className="text-lg">{pageProps.error}</p>
						<CentralHomeButton />
					</CentralInfo>
				) : (
					<Component {...pageProps} />
				)}
			</Layout>
		</Provider>
	);
}

export default MyApp;

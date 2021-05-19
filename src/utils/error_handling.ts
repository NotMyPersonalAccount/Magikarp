import { SSRErrorProps, SSRRequestLoginProps } from "../types/props";

export function sendError(error: string): SSRErrorProps {
	return { props: { error } };
}

export function requestLogin(): SSRRequestLoginProps {
	return {
		props: { request_login: true }
	};
}

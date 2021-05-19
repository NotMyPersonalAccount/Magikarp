export function sendError(error) {
	return { props: { error } };
}

export function requestLogin() {
	return {
		props: { request_login: true }
	};
}

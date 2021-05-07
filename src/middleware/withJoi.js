export default function withJoi(handler, schema) {
	return async (req, res) => {
		if (req.method !== "POST") {
			return res.status(405).send("Expected POST method");
		}
		if (schema.validate(req.body).error) {
			return res.status(422).send("Invalid payload");
		}
		return handler(req, res);
	};
}

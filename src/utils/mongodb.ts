import { Db, MongoClient } from "mongodb";

const { MONGODB_URI, MONGODB_DB } = process.env;
if (!MONGODB_URI) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env.local"
	);
}

if (!MONGODB_DB) {
	throw new Error(
		"Please define the MONGODB_DB environment variable inside .env.local"
	);
}

let cached = { conn: null, promise: null };

export async function connectToDatabase(): Promise<{
	client: MongoClient;
	db: Db;
}> {
	if (cached.conn) return cached.conn;

	if (!cached.promise) {
		cached.promise = MongoClient.connect(MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).then(client => {
			return {
				client,
				db: client.db(MONGODB_DB)
			};
		});
	}
	cached.conn = await cached.promise;
	return cached.conn;
}

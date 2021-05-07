export interface Class {
	_id: string;
	name: string;
	description?: string;
	created_at: number;
}

export interface ClassProp {
	class: Class;
}

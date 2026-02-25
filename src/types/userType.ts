export interface TypeUser {
	id: string;
	name: string;
	email: string;
	avatar: string;
}

export type TaskStatus = "done" | "pending";

export interface Task {
	id: string;
	title: string;
	status: TaskStatus;
	userId: string;
}

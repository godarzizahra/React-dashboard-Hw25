import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Task } from "../../types/userType";

interface TaskState {
	tasks: Task[];
	filter: "all" | "done" | "pending";
	selectedUserId: string | null;
}

const initialState: TaskState = {
	tasks: [],
	filter: "all",
	selectedUserId: null,
};

const taskSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<Task>) => {
			state.tasks.push(action.payload);
		},
		deleteTask: (state, action: PayloadAction<string>) => {
			state.tasks = state.tasks.filter((t) => t.id !== action.payload);
		},
		toggleTaskStatus: (state, action: PayloadAction<string>) => {
			const task = state.tasks.find((t) => t.id === action.payload);
			if (task) {
				task.status = task.status === "done" ? "pending" : "done";
			}
		},
		setFilter: (state, action: PayloadAction<"all" | "done" | "pending">) => {
			state.filter = action.payload;
		},
		setSelectedUser: (state, action: PayloadAction<string>) => {
			state.selectedUserId = action.payload;
		},
	},
});

export const {
	addTask,
	deleteTask,
	toggleTaskStatus,
	setFilter,
	setSelectedUser,
} = taskSlice.actions;
export default taskSlice.reducer;

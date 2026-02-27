import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../store/slice/taskSlice";
import { type Rootstate } from "../../store/store";
import { v4 as uuidv4 } from "uuid";

export default function TaskDialog() {
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState("");

	const dispatch = useDispatch();
	const selectedUserId = useSelector(
		(state: Rootstate) => state.tasks.selectedUserId,
	);

	const handleAdd = () => {
		if (!title || !selectedUserId) return;

		dispatch(
			addTask({
				id: uuidv4(),
				title,
				status: "pending",
				userId: selectedUserId,
			}),
		);

		setTitle("");
		setOpen(false);
	};

	if (!selectedUserId) return null;

	return (
		<>
			<Button variant="contained" onClick={() => setOpen(true)}>
				Add Task
			</Button>

			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Add New Task</DialogTitle>
				<DialogContent>
					<TextField
						fullWidth
						label="Task Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						margin="dense"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)}>Cancel</Button>
					<Button onClick={handleAdd} variant="contained">
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

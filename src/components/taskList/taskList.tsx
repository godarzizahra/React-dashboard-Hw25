import DeleteIcon from "@mui/icons-material/Delete";
import {
	Card,
	CardContent,
	Chip,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, toggleTaskStatus } from "../../store/slice/taskSlice";
import { type Rootstate } from "../../store/store";
import TaskDialog from "../taskDialog/taskDialog";

export default function TaskList() {
	const dispatch = useDispatch();
	const { tasks, selectedUserId } = useSelector(
		(state: Rootstate) => state.tasks,
	);

	if (!selectedUserId) {
		return <Typography>Select a user to see tasks</Typography>;
	}

	const userTasks = tasks.filter((t) => t.userId === selectedUserId);

	return (
		<div style={{ marginTop: 40 }}>
			<TaskDialog />

			<Stack spacing={2} mt={2}>
				{userTasks.length === 0 ? (
					<Typography>No tasks yet</Typography>
				) : (
					userTasks.map((task) => (
						<Card key={task.id}>
							<CardContent
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Typography>{task.title}</Typography>

								<Stack direction="row" spacing={1} alignItems="center">
									<Chip
										label={task.status}
										color={task.status === "done" ? "success" : "warning"}
										onClick={() => dispatch(toggleTaskStatus(task.id))}
									/>

									<IconButton
										color="error"
										onClick={() => dispatch(deleteTask(task.id))}
									>
										<DeleteIcon />
									</IconButton>
								</Stack>
							</CardContent>
						</Card>
					))
				)}
			</Stack>
		</div>
	);
}

import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useUsers } from "../../hooks/useUsers";
import { setSelectedUser } from "../../store/slice/taskSlice";

export default function UserList() {
	const dispatch = useDispatch();
	const { data, isLoading, error } = useUsers();
	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-64 text-gray-500 text-lg font-medium">
				Is Loading...
			</div>
		);
	}
	if (error) {
		return (
			<div className="flex justify-center items-center h-64 text-red-500 text-lg font-medium">
				{error}
			</div>
		);
	}
	return (
		<Grid
			container
			spacing={{ xs: 2, md: 3 }}
			columns={{ xs: 4, sm: 8, md: 12 }}
		>
			{data?.map((user) => (
				<Grid key={user.id} size={{ xs: 2, sm: 4, md: 4 }}>
					<Card
						sx={{ maxWidth: 345 }}
						onClick={() => dispatch(setSelectedUser(user.id))}
					>
						<CardMedia
							component="img"
							alt={user.name}
							height="140"
							image={user.avatar}
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								{user.name}
							</Typography>
							<Typography variant="body2" sx={{ color: "text.secondary" }}>
								{user.email}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			))}
		</Grid>
	);
}

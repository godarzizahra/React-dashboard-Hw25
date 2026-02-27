import {
	Card,
	CardContent,
	CardMedia,
	Container,
	Grid,
	Skeleton,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useUsers } from "../../hooks/useUsers";
import { setSelectedUser } from "../../store/slice/taskSlice";
import { type RootState } from "../../store/store";

export default function UserList() {
	const selectedUserId = useSelector(
		(state: RootState) => state.tasks.selectedUserId,
	);
	const [search, setSearch] = useState("");
	const dispatch = useDispatch();
	const { data, isLoading, error } = useUsers();
	if (isLoading) {
		return (
			<Container>
				<Grid
					container
					spacing={{ xs: 2, md: 3 }}
					columns={{ xs: 4, sm: 8, md: 12 }}
				>
					{[...Array(6)].map((_, index) => (
						<Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
							<Card sx={{ maxWidth: 345 }}>
								<Skeleton variant="rectangular" height={140} />
								<CardContent>
									<Skeleton variant="text" height={30} />
									<Skeleton variant="text" height={20} width="80%" />
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
		);
	}
	if (error) {
		return (
			<div className="flex justify-center items-center h-64 text-red-500 text-lg font-medium">
				{error}
			</div>
		);
	}
	const filteredUsers = data?.filter((user) =>
		user.name.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<Container>
			<TextField
				fullWidth
				label="Search user..."
				variant="outlined"
				margin="normal"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>

			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 4, sm: 8, md: 12 }}
			>
				{filteredUsers?.map((user) => (
					<Grid key={user.id} size={{ xs: 2, sm: 4, md: 4 }}>
						<Card
							sx={{
								maxWidth: 345,
								cursor: "pointer",
								border:
									selectedUserId === user.id
										? "2px solid #1976d2"
										: "1px solid transparent",
								boxShadow: selectedUserId === user.id ? 6 : 1,
							}}
							onClick={() => dispatch(setSelectedUser(user.id))}
						>
							<CardMedia
								component="img"
								alt={user.name}
								height="180"
								image={user.avatar}
							/>
							<CardContent>
								<Typography gutterBottom variant="h5">
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
		</Container>
	);
}

import { useUsers } from "../../hooks/useUsers";

export default function UserList() {
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
		<div>
			{data?.map((user) => (
				<div key={user.id}>
					<h3>{user.name}</h3>
					<p>{user.email}</p>
					<img src={user.avatar} alt="" />
				</div>
			))}
		</div>
	);
}

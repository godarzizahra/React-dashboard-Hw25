import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/services";
import { type TypeUser } from "../types/userType";

export function useUsers() {
	const { data, isLoading, error } = useQuery<TypeUser[]>({
		queryKey: ["users"],
		queryFn: getUsers,
	});
	return { data, isLoading, error: error ? "fail to fetch" : "" };
}

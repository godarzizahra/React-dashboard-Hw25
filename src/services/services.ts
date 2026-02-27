import axios from "axios";
import { API_Users } from "../constants/base-url";

export async function getUsers() {
	const res = await axios.get(API_Users);
	return res.data;
}

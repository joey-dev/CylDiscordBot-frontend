import { useQuery } from "react-query";
import Axios from "../Axios/AxiosConfig";

export const useCheckAuth = () => {
	return useQuery<boolean, Error>("checkAuth", async () => {
		return await getUser();
	}, {
		cacheTime: 0,
	});
};


export const useQueryCheckAuth = async () => {
	return Axios().get("/user");
}

const getUser = async () => {
	const {data} = await Axios().get("/user");
	return data;
}

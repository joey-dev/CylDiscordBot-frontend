import { useRouter } from "next/router";
import React from "react";
import Button from "../../components/forms/Button/Button";

const NotFound: React.FC = () => {
	const router = useRouter();
	return (
		<main style={{padding: "1rem"}}>
			<p>404 page not found</p>
			<Button
				variant="outlined"
				onClick={() => {
					router.push("/");
				}}
			> Go Back Home
			</Button>
		</main>
	);
};

export default NotFound;

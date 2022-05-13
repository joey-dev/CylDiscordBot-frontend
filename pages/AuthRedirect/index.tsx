import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/layout/Loader/Loader";
import { AppDispatch, MapStateToProps } from "../../store";
import { auth } from "../../store/auth/Action";


interface AuthRedirectProps {
	code: string,
}

interface ISelector {
	loading: boolean,
	error?: string,
	isAuthenticated: boolean,
}

const AuthRedirect: InferGetServerSidePropsType<typeof getServerSideProps> = (props: AuthRedirectProps) => {
	const [error, setError] = useState(false);
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();

	console.log(error);

	const selector = useSelector<MapStateToProps, ISelector>(state => {
		return {
			loading: state.auth.loading,
			error: state.auth.error || undefined,
			isAuthenticated: state.auth.userId !== null,
		};
	});

	useEffect(() => {
		if (selector.isAuthenticated) {
			router.push(
				{
					pathname: "/Dashboard",
				},
				"/Dashboard",
			);
		}
	}, [selector.isAuthenticated]);

	useEffect(() => {
		console.log(selector);
		if (!selector.isAuthenticated && !selector.loading) {
			if (!props.code || selector.error) {
				setError(true);
			} else {
				dispatch(auth(props.code));
			}
		}
	}, [selector.isAuthenticated, selector.loading, selector.error]);

	return (
		<>
			{selector.loading && <Loader centered />}
			{error && <p>An error occurred while logging in. Please try again</p>}
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const code = context.query["code"] as string | undefined;

	if (!code) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			code,
		},
	} as { props: AuthRedirectProps };
};

export default AuthRedirect;

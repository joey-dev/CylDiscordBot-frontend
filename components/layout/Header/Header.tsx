import { getItemTranslate, ILanguages } from "@cylbot/cyldiscordbotlanguage/index";
import { SelectChangeEvent } from "@mui/material";
import { InferGetServerSidePropsType, NextPageContext } from "next";
import Link from "next/link";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AppDispatch, MapStateToProps } from "../../../store";
import { AuthStoreState } from "../../../store/auth";
import { authCheckState, logout } from "../../../store/auth/Action";
import { IDisplayLanguage, websiteStoreState } from "../../../store/website";
import { setWebsiteLanguage } from "../../../store/website/Action";
import Button from "../../forms/Button/Button";
import Select from "../../forms/select/Select/Select";
import GetLanguageSelectValues from "./GetLanguageSelectValues/GetLanguageSelectValues";


const OuterDiv = styled.div`
    width: 100%;
    overflow: hidden;
    background-color: #202225;
    padding-top: 2.5vh;
    padding-bottom: 2.5vh;
`;

const ButtonDiv = styled.div`
    float: right;
    margin-right: 20px;
`;

type DispatchProps = {
	logout: () => void;
	setWebsiteLanguage: (language: IDisplayLanguage) => void;
};

type Props = DispatchProps & AuthStoreState & websiteStoreState;

const Header: React.FC<Props> = (props) => {
	const selector = useSelector<MapStateToProps, { isAuthenticated: boolean }>(state => {
		return {
			isAuthenticated: state.auth.userId !== null,
		};
	});
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (!selector.isAuthenticated) {
			dispatch(authCheckState());
		}
	}, [selector.isAuthenticated]);


	const languages: IDisplayLanguage[] = [
		{
			flag: "us",
			name: "en-US",
			key: "enUS",
		},
		{
			flag: "nl",
			name: "nl-NL",
			key: "nlNL",
		},
	];

	const loginButton = (
		<Button
			variant="outlined"
			onClick={() => {
				window.location.href = "https://discord.com/api/oauth2/authorize?client_id=794964425819160587&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FAuthRedirect&response_type=code&scope=identify%20guilds";
			}}
		>
			{getItemTranslate(props.language.key, "LOGIN_BUTTON")}
		</Button>
	);

	const dashboardButton = (
		<Link href="/Dashboard" >
			<Button
				variant="outlined"
			>
				Dashboard
			</Button>
		</Link>
	);

	const welcomeMessage = (
		<>
			<Button variant="text"
				onClick={() => {
					props.logout();
				}}
			>
				&nbsp;{getItemTranslate(props.language.key, "LOGOUT")}
			</Button>
		</>
	);

	const handleChange = (event: SelectChangeEvent) => {
		const newLanguageKey = event.target.value as keyof ILanguages;
		const newLanguage: IDisplayLanguage | undefined = languages.find(language => language.key === newLanguageKey);

		if (newLanguage) {
			props.setWebsiteLanguage(newLanguage);
		}
	};

	return (
		<OuterDiv>
			{props.isAuthenticated ? dashboardButton : loginButton}
			<ButtonDiv>
				{props.isAuthenticated && welcomeMessage}
				<Select
					value={props.language.key}
					onChange={handleChange}
					label="Languages"
				>
					{GetLanguageSelectValues(languages)}
				</Select>
			</ButtonDiv>
		</OuterDiv>
	);
};

const mapStateToProps = (state: MapStateToProps) => {
	return {
		user: state.user.user,
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.userId !== null,
		authRedirectPath: state.auth.authRedirectPath,
		language: state.website.language,
	};
};

type DispatchPropsArgs = {
	type: string;
};

const mapDispatchToProps = (dispatch: (arg0: DispatchPropsArgs) => void) => {
	return {
		logout: () => dispatch(logout()),
		setWebsiteLanguage: (language: IDisplayLanguage) => dispatch(setWebsiteLanguage(language)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

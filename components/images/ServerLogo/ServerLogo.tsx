import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { IServer } from "../../../interfaces/api/Server";


type EmptyLogoProps = {
	size: number;
};

const StyledEmptyLogo = styled.div<EmptyLogoProps>`
    border: 2px solid rgb(85, 87, 98);
    background: transparent;
    filter: none;
    font-size: ${(props: EmptyLogoProps) => props.size / 3}px;
    border-radius: 80px;
    height: ${(props: EmptyLogoProps) => props.size}px;
    width: ${(props: EmptyLogoProps) => props.size}px;
    align-items: center;
    display: flex;
    justify-content: center;
`;

const StyledLogoContainer = styled.div<EmptyLogoProps>`
    border: 2px solid white;
    border-radius: 80px;
    height: ${(props: EmptyLogoProps) => props.size}px;
    width: ${(props: EmptyLogoProps) => props.size}px;
`;


type Props = {
	size: number;
	server: IServer;
}

const ServerLogo: React.FC<Props> = (props: Props) => {
	const emptyLogo = (
		<StyledEmptyLogo size={props.size}>
			{GetFirstLetterOfEveryWordInStringMax3(props.server.name)}
		</StyledEmptyLogo>
	);

	const logo = (
		<StyledLogoContainer size={props.size}>
			<Image
				src={"https://cdn.discordapp.com/icons/" + props.server.id + "/" + props.server.icon + ".png"}
				width={props.size}
				height={props.size}
			/>
		</StyledLogoContainer>
	);

	return (
		<>
			{!props.server.icon ? emptyLogo : logo}
		</>
	);
};

const GetFirstLetterOfEveryWordInStringMax3 = (string: string): string => {
	const matches = string.match(/\b(\w)/g);
	if (matches) {
		return matches.join("").substring(0, 3);
	}

	return "";
};

export default ServerLogo;

import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IServer } from "../../../interfaces/api/Server";
import check from "../../../public/assets/icons/check.svg";
import unCheck from "../../../public/assets/icons/uncheck.svg";
import {
	ISelectWithLogoAndIconItem,
} from "../../forms/select/SelectWithLogoAndIcon/SelectWithLogoAndIconItem/SelectWithLogoAndIconItem";
import ServerLogo from "../../images/ServerLogo/ServerLogo";
import { StyledCheckImgContainer } from "./ServerItems.style";

export interface ServerItemsLogicProps {
	currentServerId?: string;
	servers: IServer[];
}

interface ReturnValue {
	currentServer: ISelectWithLogoAndIconItem;
	setCurrentServerId: (serverId: string) => void;
	serverList: ISelectWithLogoAndIconItem[];
}

function ServerItemsLogic(props: ServerItemsLogicProps): ReturnValue {
	const router = useRouter();
	const [currentServerId, setCurrentServerId] = useState(props.currentServerId);

	let serverList: ISelectWithLogoAndIconItem[] = [];
	let currentServer: ISelectWithLogoAndIconItem | undefined = undefined;

	const setCurrentServer = (serverId: string): void => {
		setCurrentServerId(serverId);

		if (serverId === undefined) {
			router.push("/Dashboard");
		} else {
			router.push("/Dashboard?serverId=" + serverId);
		}
	}

	// useEffect(() => {
	// 	console.log(currentServerId);
	// 	if (currentServerId === undefined) {
	// 		router.push("/Dashboard");
	// 	} else {
	// 		router.push("/Dashboard?serverId:" + currentServerId);
	// 	}
	// }, [currentServerId]);


	for (let server of props.servers) {
		if (currentServerId && server.id === currentServerId) {
			currentServer = {
				key: server.id,
				value: {
					logo: <ServerLogo size={40}
						server={server}
					/>,
					text: server.name,
					icon: getImageProp(server),
				},
			};
		} else {
			serverList.push({
				key: server.id,
				value: {
					logo: <ServerLogo size={40}
						server={server}
					/>,
					text: server.name,
					icon: getImageProp(server),
				},
			} as ISelectWithLogoAndIconItem);
		}
	}

	if (!currentServer) {
		currentServer = {
			value: {
				text: "Please select a server",
			},
		};
	}

	return {
		currentServer: currentServer,
		setCurrentServerId: setCurrentServer,
		serverList: serverList,
	};
}

function getImageProp(server: IServer): JSX.Element {
	return (
		<StyledCheckImgContainer>
			<Image
				src={server.alreadyJoined ? check : unCheck}
				width={25}
				height={25}
				alt="check"
			/>
		</StyledCheckImgContainer>
	);
}

export default ServerItemsLogic;

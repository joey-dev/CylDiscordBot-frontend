import { useRouter } from "next/router";
import React from "react";
import { IServer } from "../../interfaces/api/Server";


type ReturnValue = {
	loading: boolean,
	data?: {
		servers: IServer[],
		currentServer?: IServer,
	},
	params?: {
		pluginId?: string,
		moduleId?: string,
	}
}

type ItemDisplayLogicProps = {
	servers?: IServer[],
	currentServerId?: string,
}

const PluginIdLogic = (props: ItemDisplayLogicProps): ReturnValue => {
	const params = useRouter().query;

	if (!props.servers) {
		return {
			loading: true,
		};
	}

	const currentServer = props.servers.find(server => server.id === props.currentServerId);

	return {
		data: {
			servers: props.servers,
			currentServer,
		},
		loading: false,
		params: {
			pluginId: params.pluginId as string,
			moduleId: params.moduleId as string,
		},
	};
};

export default PluginIdLogic;

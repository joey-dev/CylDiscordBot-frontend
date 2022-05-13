import React from "react";
import { IFullModuleWithData } from "../../../interfaces/api/Module";
import { IDetailedServer } from "../../../interfaces/api/Server";
import { IEditServerData } from "../../../store/server/Sagas";
import Title from "../../text/Title/Title";
import Plugin from "./Plugin/Plugin";


type Props = {
	data: IFullModuleWithData;
	onPluginEnabledChange: (event: IEditServerData) => void;
	detailedServer: IDetailedServer;
	title: string;
};

const ModuleTemplate: React.FC<Props> = (props) => (
	<>
		<Title small={true}>
			{props.title}
		</Title>
		{props.data.plugins.map(plugin =>
			<Plugin key={plugin.id}
				detailedServer={props.detailedServer}
				data={plugin}
				onPluginEnabledChange={props.onPluginEnabledChange}
				moduleId={props.data.id}
			/>,
		)}
	</>
);

export default ModuleTemplate;

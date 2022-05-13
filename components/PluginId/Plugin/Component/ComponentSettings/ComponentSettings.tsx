import React from "react";
import { IComponentServerSettings, IFullComponentWithData } from "../../../../../interfaces/api/Component";
import { IDetailedServer } from "../../../../../interfaces/api/Server";
import ComponentSettingsLogic from "./ComponentSettings.logic";
import ComponentSettingsTemplate from "./ComponentSettings.template";


type Props = {
	open: boolean;
	onClose: () => void;
	detailedServer: IDetailedServer;
	component: IFullComponentWithData;
	onComponentSettingChange: (data: IComponentServerSettings[]) => void;
};

const ComponentSettings: React.FC<Props> = (props: Props) => {
	const logic = ComponentSettingsLogic({
		component: props.component,
		detailedServer: props.detailedServer,
	});

	return <ComponentSettingsTemplate open={props.open}
		onClose={props.onClose}
		settingsTitle={logic.settingsTitle}
		data={logic.data}
		serverData={logic.serverData}
		detailedServer={props.detailedServer}
		currentServerData={logic.currentServerData}
		onComponentSettingChange={props.onComponentSettingChange}
		editServerData={logic.editServerData}
		sharedData={logic.sharedData}
	/>
		;
};


export default (ComponentSettings);

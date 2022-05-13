import React from "react";
import { IFullModuleWithData } from "../../../interfaces/api/Module";
import { IDetailedServer } from "../../../interfaces/api/Server";
import { IEditServerData } from "../../../store/server/Sagas";
import ModuleLogic from "./Module.logic";
import ModuleTemplate from "./Module.template";


type Props = {
	data: IFullModuleWithData;
	onPluginEnabledChange: (event: IEditServerData) => void;
	detailedServer: IDetailedServer;
};

const Module: React.FC<Props> = (props: Props) => {
	const logic = ModuleLogic({
		data: props.data,
		detailedServer: props.detailedServer,
	});

	return <ModuleTemplate data={props.data}
		onPluginEnabledChange={props.onPluginEnabledChange}
		detailedServer={props.detailedServer}
		title={logic.title}
	/>;
};

export default Module;

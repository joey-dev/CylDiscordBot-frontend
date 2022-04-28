import React from "react";
import { IEditServerData } from "../../store/server/Sagas";
import ItemDisplay from "./ItemDisplay/ItemDisplay";
import LeftMenu from "./LeftMenu/LeftMenu";


export interface DashboardProps {
	currentServerId?: string;
	onPluginEnabledChange: (event: IEditServerData) => void;
	onComponentEnabledChange: (event: IEditServerData) => void;
	onComponentSettingChange: (data: IEditServerData) => void;
}

const DashboardTemplate: React.FC<DashboardProps> = (props) => (
	<>
		<LeftMenu
			currentServerId={props.currentServerId}
			onPluginEnabledChange={props.onPluginEnabledChange}
		/>
		<ItemDisplay
			currentServerId={props.currentServerId}
			onComponentEnabledChange={props.onComponentEnabledChange}
			onComponentSettingChange={props.onComponentSettingChange}
		/>
	</>
);

export default DashboardTemplate;

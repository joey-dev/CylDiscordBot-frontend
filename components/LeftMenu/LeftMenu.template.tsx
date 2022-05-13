import React from "react";
import { IFullModuleWithData } from "../../interfaces/api/Module";
import { IDetailedServer } from "../../interfaces/api/Server";
import { IEditServerData } from "../../store/server/Sagas";
import { StyledLeftMenuBackground, StyledLeftMenuInnerBackground } from "./LeftMenu.style";
import Module from "./Module/Module";
import ServerItems from "./ServerItems/ServerItems";


interface Props {
	currentServerId?: string;
	modules?: IFullModuleWithData[];
	server?: IDetailedServer;
	onPluginEnabledChange: (event: IEditServerData) => void;
}

const LeftMenuTemplate: React.FC<Props> = (props: Props) => (
	<StyledLeftMenuBackground>
		<StyledLeftMenuInnerBackground>
			<ServerItems currentServerId={props.currentServerId}
			/>
			{props.server !== undefined && props.modules !== undefined &&
				props.modules.map(module =>
					<Module key={module.id}
						detailedServer={props.server as IDetailedServer}
						data={module}
						onPluginEnabledChange={event =>
							props.onPluginEnabledChange({module_id: module.id, ...event})
						}
					/>,
				)
			}
		</StyledLeftMenuInnerBackground>
	</StyledLeftMenuBackground>
);


export default LeftMenuTemplate;

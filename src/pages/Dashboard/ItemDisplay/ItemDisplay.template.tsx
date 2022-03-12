import React from 'react';
import { IFullModuleWithData } from '../../../interfaces/api/Module';
import { IDetailedServer, IServer } from '../../../interfaces/api/Server';
import { IEditServerData } from '../../../store/server/Sagas';
import StyledItemDisplay from './ItemDisplay.style';
import NoFunctionalServer from './NoFunctionalServer/NoFunctionalServer';
import PluginBody from './PluginBody/PluginBody';


type Props = {
    currentServerId?: string;
    currentServer?: IServer;
    server?: IDetailedServer;
    modules?: IFullModuleWithData[];
    onComponentEnabledChange: (event: IEditServerData) => void;
    onComponentSettingChange: (data: IEditServerData) => void;
};

const ItemDisplayTemplate: React.FC<Props> = (props: Props) => {
    return (
        <StyledItemDisplay.Background>
            {props.currentServer && props.currentServer.alreadyJoined && props.modules && props.server ? (
                <PluginBody modules={props.modules}
                    detailedServer={props.server}
                    onComponentEnabledChange={props.onComponentEnabledChange}
                    onComponentSettingChange={props.onComponentSettingChange}
                />
            ) : (
                <NoFunctionalServer server={props.currentServer}
                    currentServerId={props.currentServerId}
                />
            )}
        </StyledItemDisplay.Background>
    );
};


export default ItemDisplayTemplate;

import React from 'react';
import styled from 'styled-components';
import NoFunctionalServer from './NoFunctionalServer/NoFunctionalServer';
import PluginBody from './PluginBody/PluginBody';
import { IFullModuleWithData } from '../../../../interfaces/api/Module';
import { IDetailedServer, IServer } from '../../../../interfaces/api/Server';
import { IEditServerData } from '../../../../store/server/Sagas';


const StyledBackground = styled.div`
    background-color: #36393F;
    width: calc(100vw - 300px);
    position: absolute;
    left: 300px;
    height: calc(95vh - 56px);
    overflow-y: auto;

    ::-webkit-scrollbar {
        width: 6px;
        padding: 3px
    }

    ::-webkit-scrollbar-thumb {
        background-color: #43464D;
    }
`;


type Props = {
    server?: IServer;
    modules?: IFullModuleWithData[];
    currentServerId?: string;
    detailedServer?: IDetailedServer;
    onComponentEnabledChange: (event: IEditServerData) => void;
    onComponentSettingChange: (data: IEditServerData) => void;
};

const ItemDisplay: React.FC<Props> = (props: Props) => {
    return (
        <StyledBackground>
            {props.server && props.server.alreadyJoined && props.modules && props.detailedServer ? (
                <PluginBody modules={props.modules}
                    detailedServer={props.detailedServer}
                    onComponentEnabledChange={props.onComponentEnabledChange}
                    onComponentSettingChange={props.onComponentSettingChange}
                />
            ) : (
                <NoFunctionalServer server={props.server}
                    currentServerId={props.currentServerId}
                />
            )}
        </StyledBackground>
    );
};

export default (ItemDisplay);

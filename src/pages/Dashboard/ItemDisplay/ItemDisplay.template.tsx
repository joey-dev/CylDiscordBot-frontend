import React from 'react';
import { Params, useParams } from 'react-router-dom';
import { IFullModuleWithData } from '../../../interfaces/api/Module';
import { IDetailedServer, IServer } from '../../../interfaces/api/Server';
import { IEditServerData } from '../../../store/server/Sagas';
import StyledItemDisplay from './ItemDisplay.style';
import NoFunctionalServer from './NoFunctionalServer/NoFunctionalServer';
import Plugin from './Plugin/Plugin';


type Props = {
    currentServerId?: string;
    currentServer?: IServer;
    server?: IDetailedServer;
    modules?: IFullModuleWithData[];
    onComponentEnabledChange: (event: IEditServerData) => void;
    onComponentSettingChange: (data: IEditServerData) => void;
    params?: Readonly<Params<string>>;
};

const ItemDisplayTemplate: React.FC<Props> = (props: Props) => (
    <StyledItemDisplay.Background>
        {
            (
                props.currentServer &&
                props.currentServer.alreadyJoined &&
                props.modules && props.server
            ) ?
            (
                props.params && props.params.pluginId && props.params.moduleId ? (
                    <Plugin moduleId={props.params.moduleId}
                        pluginId={props.params.pluginId}
                        modules={props.modules}
                        detailedServer={props.server}
                        onComponentEnabledChange={props.onComponentEnabledChange}
                        onComponentSettingChange={props.onComponentSettingChange}
                    />
                ) : (
                    <p>info page here!</p>
                )
            ) : (
                <NoFunctionalServer server={props.currentServer}
                    currentServerId={props.currentServerId}
                />
            )
        }
    </StyledItemDisplay.Background>
);



export default ItemDisplayTemplate;

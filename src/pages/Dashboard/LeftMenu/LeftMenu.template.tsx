import React from 'react';
import { IFullModuleWithData } from '../../../interfaces/api/Module';
import { IDetailedServer } from '../../../interfaces/api/Server';
import { IEditServerData } from '../../../store/server/Sagas';
import { StyledLeftMenuBackground, StyledLeftMenuInnerBackground } from './LeftMenu.style';
import ModuleList from './ModuleList/ModuleList';
import ServerItems from './ServerItems/ServerItems';


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
            {(props.server !== undefined && props.modules !== undefined) && (
                <ModuleList server={props.server}
                    modules={props.modules}
                    onPluginEnabledChange={props.onPluginEnabledChange}
                />
            )}
        </StyledLeftMenuInnerBackground>
    </StyledLeftMenuBackground>
);


export default LeftMenuTemplate;

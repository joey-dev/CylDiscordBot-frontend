import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Plugin from './Plugin/Plugin';
import { IFullModuleWithData } from '../../../../../interfaces/api/Module';
import { IDetailedServer } from '../../../../../interfaces/api/Server';
import { IEditServerData } from '../../../../../store/server/Sagas';


const StyledBackground = styled.div`
`;

type Props = {
    modules: IFullModuleWithData[];
    detailedServer: IDetailedServer;
    onComponentEnabledChange: (event: IEditServerData) => void;
    onComponentSettingChange: (data: IEditServerData) => void;
};

const PluginBody: React.FC<Props> = (props: Props) => {
    let params = useParams();

    return (
        <StyledBackground>
            {params.pluginId && params.moduleId && props.modules ? (
                <Plugin moduleId={params.moduleId}
                    pluginId={params.pluginId}
                    modules={props.modules}
                    detailedServer={props.detailedServer}
                    onComponentEnabledChange={props.onComponentEnabledChange}
                    onComponentSettingChange={props.onComponentSettingChange}
                />
            ) : (
                <p>works</p>
            )}
        </StyledBackground>

    );
};

export default (PluginBody);

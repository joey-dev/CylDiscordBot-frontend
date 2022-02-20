import React from 'react';
import styled from 'styled-components';
import ChannelSetting
    from './componentSettingTypes/ChannelSetting/ChannelSetting';
import DeleteCommand
    from './componentSettingTypes/DeleteCommand/DeleteCommand';
import DeleteReply from './componentSettingTypes/DeleteReply/DeleteReply';
import Ephemeral from './componentSettingTypes/Ephemeral/Ephemeral';
import RoleSetting from './componentSettingTypes/RoleSetting/RoleSetting';
import { IComponentServerSettings, IComponentSettings } from '../../../../../../../../../interfaces/api/Component';
import { IDetailedServer } from '../../../../../../../../../interfaces/api/Server';


const StyledComponent = styled.div`
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid darkgray;`;

type Props = {
    data: IComponentSettings;
    detailedServer: IDetailedServer;
    serverData: IComponentServerSettings;
    onComponentSettingChange: (data: IComponentServerSettings) => void;
    isModalOpen: boolean;
};

const ComponentSettings: React.FC<Props> = (props: Props) => {
    let returnElement;

    switch (props.data.name) {
        case 'role':
            returnElement = <RoleSetting settings={props.serverData}
                detailedServer={props.detailedServer}
                onComponentSettingChange={props.onComponentSettingChange}
                loading={false}
                isModalOpen={props.isModalOpen}
            />;
            break;
        case 'channel':
            returnElement = <ChannelSetting settings={props.serverData}
                detailedServer={props.detailedServer}
                onComponentSettingChange={props.onComponentSettingChange}
                loading={false}
                isModalOpen={props.isModalOpen}
            />;
            break;
        case 'deleteCommand':
            returnElement = <DeleteCommand settings={props.serverData}
                detailedServer={props.detailedServer}
                onComponentSettingChange={props.onComponentSettingChange}
                isModalOpen={props.isModalOpen}
            />;
            break;
        case 'deleteReply':
            returnElement = <DeleteReply settings={props.serverData}
                detailedServer={props.detailedServer}
                onComponentSettingChange={props.onComponentSettingChange}
                isModalOpen={props.isModalOpen}
            />;
            break;
        case 'ephemeral':
            returnElement = <Ephemeral settings={props.serverData}
                detailedServer={props.detailedServer}
                onComponentSettingChange={props.onComponentSettingChange}
                isModalOpen={props.isModalOpen}
            />;
            break;
        default:
            throw new Error('data name not found in ComponentSettings');
    }

    return (
        <StyledComponent>
            {returnElement}
        </StyledComponent>
    );
};


export default (ComponentSettings);

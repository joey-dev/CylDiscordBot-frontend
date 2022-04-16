import React from 'react';
import styled from 'styled-components';
import Checkbox from '../../../../../../../components/forms/settingTypes/Checkbox/Checkbox';
import Switch from '../../../../../../../components/forms/settingTypes/Switch/Switch';
import { IComponentServerSettings, IComponentSettings } from '../../../../../../../interfaces/api/Component';
import { IDetailedServer } from '../../../../../../../interfaces/api/Server';
import { ISharedData } from '../ComponentSettings.types';
import ChannelSetting from './componentSettingTypes/ChannelSetting/ChannelSetting';
import DeleteReply from './componentSettingTypes/DeleteReply/DeleteReply';
import RoleSetting from './componentSettingTypes/RoleSetting/RoleSetting';


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
    sharedData: ISharedData;
};

const ComponentSettings: React.FC<Props> = (props: Props) => {
    const languageName = props.detailedServer.language.small_name;
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
        case 'type':
            returnElement = <Checkbox settings={props.serverData}
                onComponentSettingChange={props.onComponentSettingChange}
                title="SETTINGS_TYPES_TITLE"
                tooltip="SETTINGS_TYPES_DESCRIPTION"
                languageName={languageName}
            />;
            break;
        case 'deleteCommand':
            returnElement = <Switch settings={props.serverData}
                onComponentSettingChange={props.onComponentSettingChange}
                title="SETTINGS_DELETE_COMMAND_TITLE"
                tooltip="SETTINGS_DELETE_COMMAND_DESCRIPTION"
                languageName={languageName}
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
            returnElement = <Switch settings={props.serverData}
                onComponentSettingChange={props.onComponentSettingChange}
                title="SETTINGS_EPHEMERAL_TITLE"
                tooltip="SETTINGS_EPHEMERAL_DESCRIPTION"
                languageName={languageName}
                disabled={!props.sharedData.type.slash || props.sharedData.deleteReply}
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

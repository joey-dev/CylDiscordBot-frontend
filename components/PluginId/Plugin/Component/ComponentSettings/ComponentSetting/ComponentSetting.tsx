import React from 'react';
import styled from 'styled-components';
import AutoCompleteWithSwitch
    from '../../../../../forms/settingTypes/AutoCompleteWithSwitch/AutoCompleteWithSwitch';
import Checkbox from '../../../../../forms/settingTypes/Checkbox/Checkbox';
import Switch from '../../../../../forms/settingTypes/Switch/Switch';
import { IAutoCompleteData } from '../../../../../forms/settingTypes/util/AutoComplete/AutoComplete';
import { IComponentServerSettings, IComponentSettings } from '../../../../../../interfaces/api/Component';
import { IDetailedServer } from '../../../../../../interfaces/api/Server';
import { ISharedData } from '../ComponentSettings.types';


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
            returnElement = <AutoCompleteWithSwitch
                settings={props.serverData}
                onComponentSettingChange={props.onComponentSettingChange}
                isModalOpen={props.isModalOpen}
                languageName={languageName}
                text={{
                    name: 'ROLES',
                    switchName: 'SETTINGS_ROLES_TITLE',
                    switchDescription: 'SETTINGS_ROLES_DESCRIPTION',
                    enabled: 'ENABLED',
                    disabled: 'DISABLED',
                }}
                type="roles"
            />;
            break;
        case 'channel':
            returnElement = <AutoCompleteWithSwitch
                settings={props.serverData}
                onComponentSettingChange={props.onComponentSettingChange}
                isModalOpen={props.isModalOpen}
                languageName={languageName}
                text={{
                    name: 'CHANNELS',
                    switchName: 'SETTINGS_CHANNELS_TITLE',
                    switchDescription: 'SETTINGS_CHANNELS_DESCRIPTION',
                    enabled: 'ENABLED',
                    disabled: 'DISABLED',
                }}
                type="channels"
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
            returnElement = <AutoCompleteWithSwitch
                settings={props.serverData}
                onComponentSettingChange={props.onComponentSettingChange}
                isModalOpen={props.isModalOpen}
                languageName={languageName}
                text={{
                    name: 'SETTINGS_DELETE_REPLY_TITLE',
                    switchName: 'SETTINGS_DELETE_REPLY_DESCRIPTION',
                    switchDescription: 'SETTINGS_DELETE_REPLY_SECONDS',
                    enabled: 'SETTINGS_DELETE_REPLY_TITLE',
                    disabled: 'SETTINGS_DELETE_REPLY_TITLE',
                }}
                type="deleteReply"
                data={Array(10)
                    .fill(1)
                    .map((x, y) => {
                        const value = (x + y).toString();
                        return {
                            id: value,
                            name: value,
                        } as IAutoCompleteData;
                    })
                }
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

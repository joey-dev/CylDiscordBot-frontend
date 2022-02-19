import { AutocompleteRenderInputParams, TextField } from '@mui/material';
import React from 'react';
import { IComponentServerSettings } from '../../../../../../../../../../../interfaces/api/Component';
import AutoComplete from '../AutoComplete';
import { IChannelsData } from './ChannelSetting';


type Props = {
    name: string;
    getItems: () => void;
    onComponentSettingChange: (data: IComponentServerSettings) => void;
    getValueForAutoCompleteFromChannels: (channels: IChannelsData[] | undefined) => string[];
    channels: IChannelsData[] | undefined;
    settings: IComponentServerSettings;
    selectedChannels: IChannelsData[];
    setSelectedChannels: (value: IChannelsData[]) => void;
    editChannelData: (data: object, channels: IChannelsData[]) => object;
    getValueForChannelsFromAutoComplete: (channels: string[], allChannels: IChannelsData[] | undefined) => IChannelsData[];
};

const ChannelSettingAutoComplete: React.FC<Props> = (props: Props) => {
    return (
        <AutoComplete
            options={props.getValueForAutoCompleteFromChannels(props.channels)}
            name={props.name}
            onOpen={() => props.getItems()}
            onClose={() => {
                props.onComponentSettingChange(
                    {
                        ...props.settings,
                        ...{data: props.editChannelData(props.settings.data, props.selectedChannels)},
                    },
                );
            }}
            onChange={(event, value, reason) => {
                const fullChannels = props.getValueForChannelsFromAutoComplete(value, props.channels);
                props.setSelectedChannels(fullChannels);
                if (reason === 'clear') {
                    props.onComponentSettingChange(
                        {
                            ...props.settings,
                            ...{data: props.editChannelData(props.settings.data, [])},
                        },
                    );
                } else if (reason === 'removeOption') {
                    props.onComponentSettingChange(
                        {
                            ...props.settings,
                            ...{data: props.editChannelData(props.settings.data, fullChannels)},
                        },
                    );
                }
            }}
            value={props.getValueForAutoCompleteFromChannels(props.selectedChannels)}
        />
    );
};

export default ChannelSettingAutoComplete;

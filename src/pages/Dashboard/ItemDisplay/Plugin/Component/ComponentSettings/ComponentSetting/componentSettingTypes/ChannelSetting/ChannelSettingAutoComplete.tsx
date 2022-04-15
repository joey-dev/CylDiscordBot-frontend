import React from 'react';
import { IRolesData, IComponentServerSettings } from '../../../../../../../../../interfaces/api/Component';
import AutoComplete from '../AutoComplete';

//TODO: fix types
type Props = {
    name: string;
    getItems: () => void;
    onComponentSettingChange: (data: IComponentServerSettings) => void;
    channels: IRolesData[] | undefined;
    settings: IComponentServerSettings;
    selectedChannels: IRolesData[];
    setSelectedChannels: (value: IRolesData[]) => void;
};

const ChannelSettingAutoComplete: React.FC<Props> = (props: Props) => {
    return (
        <AutoComplete
            options={getValueForAutoCompleteFromChannels(props.channels)}
            name={props.name}
            onOpen={() => props.getItems()}
            onClose={() => props.onComponentSettingChange(componentSettingChange(props.settings, props.selectedChannels))}
            onChange={(event, value, reason) => {
                const fullChannels = getValueForChannelsFromAutoComplete(value, props.channels);
                props.setSelectedChannels(fullChannels);
                if (reason === 'clear') {
                    props.onComponentSettingChange(componentSettingChange(props.settings, []));
                } else if (reason === 'removeOption') {
                    props.onComponentSettingChange(componentSettingChange(props.settings, fullChannels));
                }
            }}
            value={getValueForAutoCompleteFromChannels(props.selectedChannels)}
        />
    );
};

const componentSettingChange = (settings: IComponentServerSettings, selectedChannels: IRolesData[]): IComponentServerSettings => {
    return {
        ...settings,
        ...{data: editChannelData(settings.data, selectedChannels)},
    };
};

const editChannelData = (data: object, channels: IRolesData[]): object => {
    data = {
        ...data,
        channels: channels,
    };

    return data;
};

const getValueForChannelsFromAutoComplete = (channels: string[], allChannels: IRolesData[] | undefined): IRolesData[] => {
    if (!allChannels || channels.length === 0) {
        return [];
    }

    const returnValue: IRolesData[] = [];

    channels.forEach(channel => {
        const foundChannel = allChannels.find(allChannel => allChannel.name === channel);
        if (foundChannel) {
            returnValue.push(foundChannel);
        }
    });

    return returnValue;
};

const getValueForAutoCompleteFromChannels = (channels: IRolesData[] | undefined): string[] => {
    if (!channels || channels.length === 0) {
        return [];
    }

    const returnValue: string[] = [];
    channels.forEach(channel => {
        returnValue.push(channel.name);
    });

    if (returnValue.length === 0) {
        return [];
    }

    return returnValue;
};

export default ChannelSettingAutoComplete;

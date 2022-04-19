import React from 'react';
import { IChannelsData, IComponentServerSettings, IRolesData } from '../../../../../interfaces/api/Component';
import { default as AutoCompleteForm } from '../../../Autocomplete/AutoComplete';

export interface IAutoCompleteData {
    id: string,
    name: string,
}

export type IAutoCompleteDataType = 'roles' | 'channels';

interface SelectedDataFunctions {
    roles: (data: IRolesData[]) => void,
    channels: (data: IChannelsData[]) => void,
}

interface Props {
    name: string,
    getItems: () => void,
    onComponentSettingChange: (data: IComponentServerSettings) => void,
    data?: IAutoCompleteData[],
    settings: IComponentServerSettings,
    selectedData: IAutoCompleteData[],
    setSelectedData: SelectedDataFunctions,
    type: IAutoCompleteDataType,
}

const AutoComplete: React.FC<Props> = (props: Props) => {
    return (
        <AutoCompleteForm
            options={getValueForAutoCompleteFromData(props.data)}
            name={props.name}
            onOpen={() => props.getItems()}
            onClose={() => props.onComponentSettingChange(componentSettingChange(props.settings, props.selectedData, props.type))}
            onChange={(event, value, reason) => {
                const fullRoles = getValueForDataFromAutoComplete(value, props.data);
                SetSelectedData(props.setSelectedData, props.type)(fullRoles);
                if (reason === 'clear') {
                    props.onComponentSettingChange(componentSettingChange(props.settings, [], props.type));
                } else if (reason === 'removeOption') {
                    props.onComponentSettingChange(componentSettingChange(props.settings, fullRoles, props.type));
                }
            }}
            value={getValueForAutoCompleteFromData(props.selectedData)}
        />
    );
};

const SetSelectedData = (setSelectedData: SelectedDataFunctions, type: IAutoCompleteDataType) => {
    switch (type) {
        case 'roles':
            return setSelectedData.roles;
        case 'channels':
            return setSelectedData.channels;
        default:
            throw new Error("type unset");
    }
};

const componentSettingChange = (settings: IComponentServerSettings, selectedData: IAutoCompleteData[], type: IAutoCompleteDataType): IComponentServerSettings => {
    return {
        ...settings,
        ...{data: editRoleData(settings.data, selectedData, type)},
    };
};

const editRoleData = (oldData: object, newData: IAutoCompleteData[], type: IAutoCompleteDataType): object => {
    oldData = {
        ...oldData,
        [type]: newData,
    };

    return oldData;
};

const getValueForDataFromAutoComplete = (dataArray: string[], allData?: IAutoCompleteData[]): IAutoCompleteData[] => {
    if (!allData || dataArray.length === 0) {
        return [];
    }

    const returnValue: IAutoCompleteData[] = [];

    dataArray.forEach(data => {
        const foundData = allData.find(dataFound => dataFound.name === data);
        if (foundData) {
            returnValue.push(foundData);
        }
    });

    return returnValue;
};

const getValueForAutoCompleteFromData = (data?: IAutoCompleteData[]): string[] => {
    if (!data || data.length === 0) {
        return [];
    }

    const returnValue: string[] = [];
    data.forEach(data => {
        returnValue.push(data.name);
    });

    if (returnValue.length === 0) {
        return [];
    }

    return returnValue;
};

export default AutoComplete;

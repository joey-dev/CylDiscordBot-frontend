import React from 'react';
import { IChannelsData, IComponentServerSettings, IRolesData } from '../../../../../interfaces/api/Component';
import Loader from '../../../../layout/Loader/Loader';
import { default as AutoCompleteForm } from '../../../Autocomplete/AutoComplete';

export interface IAutoCompleteData {
    id: string,
    name: string,
}

export type IAutoCompleteDataType = 'roles' | 'channels' | 'deleteReply';

interface SelectedDataFunctions {
    roles: (data: IRolesData[]) => void,
    channels: (data: IChannelsData[]) => void,
    deleteReply: (data: IAutoCompleteData[]) => void,
}

interface Props {
    name: string,
    getItems: () => void,
    onComponentSettingChange: (data: IComponentServerSettings) => void,
    data?: IAutoCompleteData[],
    settings: IComponentServerSettings,
    selectedData?: IAutoCompleteData[],
    setSelectedData: SelectedDataFunctions,
    type: IAutoCompleteDataType,
}

const AutoComplete: React.FC<Props> = (props: Props) => {
    if (!props.data || !props.selectedData) {
        console.error('AutoComplete: data or selectedData is undefined');
        return <Loader small={true} />;
    }

    return (
        <AutoCompleteForm
            options={getValueForAutoCompleteFromData(props.type, props.data)}
            name={props.name}
            onOpen={() => props.getItems()}
            onClose={() => {
            }}
            onChange={(event, value, reason) => {
                const fullRoles = getValueForDataFromAutoComplete(value, props.data);
                SetSelectedData(props.setSelectedData, props.type)(fullRoles);
                console.log({fullRoles});
                console.log({reason});
                if (reason === 'clear') {
                    props.onComponentSettingChange(componentSettingChange(props.settings, props.type, []));
                } else if (reason === 'removeOption' || reason === 'selectOption') {
                    props.onComponentSettingChange(componentSettingChange(props.settings, props.type, fullRoles));
                }
            }}
            value={getValueForAutoCompleteValueFromData(props.type, props.selectedData)}
            multiple={multiple(props.type)}
        />
    );
};

const multiple = (type: IAutoCompleteDataType): boolean => {
    switch (type) {
        case 'roles':
            return true;
        case 'channels':
            return true;
        case 'deleteReply':
            return false;
        default:
            throw new Error('Type not set for multiple');
    }
};

const SetSelectedData = (setSelectedData: SelectedDataFunctions, type: IAutoCompleteDataType) => {
    switch (type) {
        case 'roles':
            return setSelectedData.roles;
        case 'channels':
            return setSelectedData.channels;
        case 'deleteReply':
            return setSelectedData.deleteReply;
        default:
            throw new Error('type unset');
    }
};

const componentSettingChange = (settings: IComponentServerSettings, type: IAutoCompleteDataType, selectedData?: IAutoCompleteData[]): IComponentServerSettings => {
    console.log(selectedData);
    if (selectedData) {
        return {
            ...settings,
            ...{data: editData(settings.data, selectedData, type)},
        };
    }

    return settings;
};

const editData = (oldData: object, newData: IAutoCompleteData[], type: IAutoCompleteDataType): object => {
    const saveType = getSaveType(type);
    const newRefinedData = getDataPerType(newData, type);
    oldData = {
        ...oldData,
        [saveType]: newRefinedData,
    };

    return oldData;
};

const getSaveType = (type: IAutoCompleteDataType): string => {
    switch (type) {
        case 'deleteReply':
            return 'second';

        default:
            return type;
    }
};

const getDataPerType = (newData: IAutoCompleteData[], type: IAutoCompleteDataType) => {
    switch (type) {
        case 'deleteReply':
            return newData[0].name;

        default:
            return newData;
    }
};

const getValueForDataFromAutoComplete = (dataArray: string[] | string, allData?: IAutoCompleteData[]): IAutoCompleteData[] => {
    if (!allData || dataArray.length === 0) {
        return [];
    }

    const returnValue: IAutoCompleteData[] = [];
    if (typeof dataArray === 'string') {
        dataArray = [dataArray];
    }

    dataArray.forEach(data => {
        const foundData = allData.find(dataFound => dataFound.name === data);
        if (foundData) {
            returnValue.push(foundData);
        }
    });

    return returnValue;
};


const getValueForAutoCompleteValueFromData = (type: IAutoCompleteDataType, data?: IAutoCompleteData[]): string | string[] => {
    const values = getValueForAutoCompleteFromData(type, data);
    if (multiple(type)) {
        return values;
    }

    if (values.length === 0) {
        return '';
    }
    return values[0];
};

const getValueForAutoCompleteFromData = (type: IAutoCompleteDataType, data?: IAutoCompleteData[]): string | string[] => {
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

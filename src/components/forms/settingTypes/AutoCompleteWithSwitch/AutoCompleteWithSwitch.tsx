import React from 'react';
import {
    IChannelsData,
    IComponentServerSettings,
    IRolesData,
} from '../../../../interfaces/api/Component';
import AutoComplete from '../util/AutoComplete/AutoComplete';

interface IData<T> {
    data: T;
}

type IDataWithoutParam = IData<IRolesData | IChannelsData>;
type IDataType = "IRolesData" | "IChannelsData";

type Props<T> = {
    name: string;
    getItems: () => void;
    onComponentSettingChange: (data: IComponentServerSettings) => void;
    data?: IData<T>[];
    settings: IComponentServerSettings;
    selectedData: IData<T>[];
    setSelectedData: (value: IData<T>[]) => void;
    type: IDataType;
};

const AutoCompleteWithSwitch: React.FC<Props<IRolesData | IChannelsData>> = (props: Props<IRolesData | IChannelsData>) => {
    // let data;
    // let selectedData;
    // let setSelectedData;
    //
    // switch (props.type) {
    //     case 'IChannelsData':
    //         data = props.data as IData<IChannelsData>[];
    //         selectedData = props.selectedData as IData<IChannelsData>[];
    //         setSelectedData = props.setSelectedData as (value: IData<IChannelsData>[]) => void;
    //         break;
    //     case 'IRolesData':
    //         data = props.data as IData<IRolesData>[];
    //         selectedData = props.selectedData as IData<IRolesData>[];
    //         setSelectedData = props.setSelectedData as (value: IData<IRolesData>[]) => void;
    //         break;
    // }
    return (
        <AutoComplete
            options={getValueForAutoCompleteFromData(props.data)}
            name={props.name}
            onOpen={() => props.getItems()}
            onClose={() => props.onComponentSettingChange(componentSettingChange(props.settings, props.selectedData, props.type))}
            onChange={(event, value, reason) => {
                const fullRoles = getValueForRolesFromAutoComplete(value, props.data);
                props.setSelectedData(fullRoles);
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

const componentSettingChange = (settings: IComponentServerSettings, selectedData: IDataWithoutParam[], type: IDataType): IComponentServerSettings => {
    return {
        ...settings,
        ...{data: editRoleData(settings.data, selectedData, type)},
    };
};

const editRoleData = (oldData: object, newData: IDataWithoutParam[], type: IDataType): object => {
    oldData = {
        ...oldData,
        [type]: newData,
    };

    return oldData;
};

const getValueForRolesFromAutoComplete = (dataArray: string[], allData?: IDataWithoutParam[]): IDataWithoutParam[] => {
    if (!allData || dataArray.length === 0) {
        return [];
    }

    const returnValue: IDataWithoutParam[] = [];

    dataArray.forEach(data => {
        const foundData = allData.find(dataFound => dataFound.data.name === data);
        if (foundData) {
            returnValue.push(foundData);
        }
    });

    return returnValue;
};

const getValueForAutoCompleteFromData = (data?: IDataWithoutParam[]): string[] => {
    if (!data || data.length === 0) {
        return [];
    }

    const returnValue: string[] = [];
    data.forEach(data => {
        returnValue.push(data.data.name);
    });

    if (returnValue.length === 0) {
        return [];
    }

    return returnValue;
};

export default AutoCompleteWithSwitch;

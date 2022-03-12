import React from 'react';
import { IComponentServerSettings, IRolesData } from '../../../../../../../../../../interfaces/api/Component';
import AutoComplete from '../AutoComplete';


type Props = {
    name: string;
    getItems: () => void;
    onComponentSettingChange: (data: IComponentServerSettings) => void;
    roles: IRolesData[] | undefined;
    settings: IComponentServerSettings;
    selectedRoles: IRolesData[];
    setSelectedRoles: (value: IRolesData[]) => void;
};

const RoleSettingAutoComplete: React.FC<Props> = (props: Props) => {
    return (
        <AutoComplete
            options={getValueForAutoCompleteFromRoles(props.roles)}
            name={props.name}
            onOpen={() => props.getItems()}
            onClose={() => props.onComponentSettingChange(componentSettingChange(props.settings, props.selectedRoles))}
            onChange={(event, value, reason) => {
                const fullRoles = getValueForRolesFromAutoComplete(value, props.roles);
                props.setSelectedRoles(fullRoles);
                if (reason === 'clear') {
                    props.onComponentSettingChange(componentSettingChange(props.settings, []));
                } else if (reason === 'removeOption') {
                    props.onComponentSettingChange(componentSettingChange(props.settings, fullRoles));
                }
            }}
            value={getValueForAutoCompleteFromRoles(props.selectedRoles)}
        />
    );
};

const componentSettingChange = (settings: IComponentServerSettings, selectedRoles: IRolesData[]): IComponentServerSettings => {
    return {
        ...settings,
        ...{data: editRoleData(settings.data, selectedRoles)},
    };
};

const editRoleData = (data: object, roles: IRolesData[]): object => {
    data = {
        ...data,
        roles: roles,
    };

    return data;
};

const getValueForRolesFromAutoComplete = (roles: string[], allRoles: IRolesData[] | undefined): IRolesData[] => {
    if (!allRoles || roles.length === 0) {
        return [];
    }

    const returnValue: IRolesData[] = [];

    roles.forEach(role => {
        const foundRole = allRoles.find(allRoles => allRoles.name === role);
        if (foundRole) {
            returnValue.push(foundRole);
        }
    });

    return returnValue;
};

const getValueForAutoCompleteFromRoles = (roles: IRolesData[] | undefined): string[] => {
    if (!roles || roles.length === 0) {
        return [];
    }

    const returnValue: string[] = [];
    roles.forEach(role => {
        returnValue.push(role.name);
    });

    if (returnValue.length === 0) {
        return [];
    }

    return returnValue;
};

export default RoleSettingAutoComplete;

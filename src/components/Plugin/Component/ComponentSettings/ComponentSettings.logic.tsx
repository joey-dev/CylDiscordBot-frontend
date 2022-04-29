import { getItemTranslate } from '@cylbot/cyldiscordbotlanguage';
import React from 'react';
import {
    IComponentDataTypes,
    IComponentServerSettings,
    IComponentSettings,
    IFullComponentWithData,
    ITypeData,
} from '../../../../interfaces/api/Component';
import { IDetailedServer } from '../../../../interfaces/api/Server';
import CapitalizeFirstLetter from '../../../../services/stringManipulation/CapitalizeFirstLetter';
import { ISharedData } from './ComponentSettings.types';


type ReturnValue = {
    settingsTitle: string;
    data: IComponentSettings[];
    serverData: IComponentServerSettings[];
    currentServerData: (serverData: IComponentServerSettings[], item: IComponentDataTypes) => IComponentServerSettings;
    editServerData: (serverData: IComponentServerSettings[], newData: IComponentServerSettings, name: IComponentDataTypes) => IComponentServerSettings[];
    sharedData: ISharedData;
}

type ComponentSettingsLogicProps = {
    component: IFullComponentWithData;
    detailedServer: IDetailedServer;
}

const ComponentSettingsLogic = (props: ComponentSettingsLogicProps): ReturnValue => {
    const data = JSON.parse(props.component.data) as IComponentSettings[];
    const serverData = JSON.parse(props.component.server_data) as IComponentServerSettings[];

    const languageName = props.detailedServer.language.small_name;
    const settingsTitleEditWord: string = CapitalizeFirstLetter(getItemTranslate(languageName, 'EDIT'));
    const settingsTitleNameWord: string = getItemTranslate(languageName, props.component.name);
    const settingsTitleSettingsWord: string = getItemTranslate(languageName, 'SETTINGS');
    const settingsTitle = `${settingsTitleEditWord} ${settingsTitleNameWord} ${settingsTitleSettingsWord}`;

    const unsortedSharedData = serverData.filter(unsortedItem => unsortedItem.name === 'type' || unsortedItem.name === 'deleteReply');
    const typeData = unsortedSharedData.find(unsortedSharedItem => unsortedSharedItem.name === 'type');
    const deleteReplyData = unsortedSharedData.find(unsortedSharedItem => unsortedSharedItem.name === 'deleteReply');

    if (!typeData || !deleteReplyData) {
        throw new Error('serverData has not been set in the database, or is wrong on: type or deleteCommand');
    }

    const sharedData: ISharedData = {
        type: typeData.data as ITypeData,
        deleteReply: deleteReplyData.turned_on,
    };

    return {
        settingsTitle,
        data,
        serverData,
        currentServerData,
        editServerData,
        sharedData,
    };
};


const currentServerData = (serverData: IComponentServerSettings[], item: IComponentDataTypes): IComponentServerSettings => {
    const returnValue = serverData.find(element => element.name === item);

    if (returnValue) {
        return returnValue;
    }

    throw new Error('serverData has not been set in the database, or is wrong on: ' + item);
};

const editServerData = (serverData: IComponentServerSettings[], newData: IComponentServerSettings, name: IComponentDataTypes): IComponentServerSettings[] => {
    const returnValue = serverData;

    serverData.forEach((data, index) => {
        if (serverData[index].name === name) {
            serverData[index] = newData;
        }
    });

    return returnValue;
};


export default ComponentSettingsLogic;

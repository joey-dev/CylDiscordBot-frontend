import { getItemTranslate } from '@cylbot/cyldiscordbotlanguage/index';
import { Modal } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import Paragraph from '../../../../../../../components/text/Paragraph/Paragraph';
import ComponentSetting from './ComponentSetting/ComponentSetting';
import {
    IComponentDataTypes,
    IComponentServerSettings,
    IComponentSettings, IDeleteReplyData,
    IFullComponentWithData, ITypeData,
} from '../../../../../../../interfaces/api/Component';
import { IDetailedServer } from '../../../../../../../interfaces/api/Server';
import CapitalizeFirstLetter from '../../../../../../../services/stringManipulation/CapitalizeFirstLetter';


const StyledModal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #36393f;
    color: white;
    border: 2px solid #000;
    box-shadow: black;
    max-height: 80%;
    width: 40%;
    padding: 40px;
    overflow-y: auto;

    ::-webkit-scrollbar {
        width: 6px;
        padding: 3px
    }

    ::-webkit-scrollbar-thumb {
        background-color: #43464D;
    }
`;

const StyledSettings = styled.div`
`;

export interface ISharedData {
    type: ITypeData;
    deleteReply: boolean
}

type Props = {
    open: boolean;
    onClose: () => void;
    detailedServer: IDetailedServer;
    component: IFullComponentWithData;
    onComponentSettingChange: (data: IComponentServerSettings[]) => void;
};

const ComponentSettings: React.FC<Props> = (props: Props) => {
    const data = JSON.parse(props.component.data) as IComponentSettings[];
    const serverData = JSON.parse(props.component.server_data) as IComponentServerSettings[];

    const languageName = props.detailedServer.language.small_name;
    const settingsTitleEditWord: string = CapitalizeFirstLetter(getItemTranslate(languageName, 'EDIT'));
    const settingsTitleNameWord: string = getItemTranslate(languageName, props.component.name);
    const settingsTitleSettingsWord: string = getItemTranslate(languageName, 'SETTINGS');
    const settingsTitle = `${settingsTitleEditWord} ${settingsTitleNameWord} ${settingsTitleSettingsWord}`;

    const unsortedSharedData = serverData.filter(unsortedItem => unsortedItem.name === "type" || unsortedItem.name === "deleteReply");
    const typeData = unsortedSharedData.find(unsortedSharedItem => unsortedSharedItem.name === "type");
    const deleteReplyData = unsortedSharedData.find(unsortedSharedItem => unsortedSharedItem.name === "deleteReply");

    if (!typeData || !deleteReplyData) {
        throw new Error('serverData has not been set in the database, or is wrong on: type or deleteCommand');
    }

    const sharedData: ISharedData = {
        type: typeData.data as ITypeData,
        deleteReply: deleteReplyData.turned_on as boolean,
    }

    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <StyledModal>
                <Paragraph
                    css={"margin: 0; padding: 0 0 30px 0; border-bottom: 1px solid darkgrey"}
                >
                    {settingsTitle}
                </Paragraph>
                <StyledSettings>
                    {data.map((item: IComponentSettings) =>
                        <ComponentSetting key={item.name}
                            detailedServer={props.detailedServer}
                            data={item}
                            serverData={currentServerData(serverData, item.name)}
                            onComponentSettingChange={newSettings =>
                                props.onComponentSettingChange(editServerData(serverData, newSettings, item.name))
                            }
                            isModalOpen={props.open}
                            sharedData={sharedData}
                        />,
                    )}
                </StyledSettings>
            </StyledModal>
        </Modal>
    );
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

export default (ComponentSettings);

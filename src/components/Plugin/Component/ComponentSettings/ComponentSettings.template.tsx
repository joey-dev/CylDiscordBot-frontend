import { Modal } from '@mui/material';
import React from 'react';
import Paragraph from '../../../text/Paragraph/Paragraph';
import {
    IComponentDataTypes,
    IComponentServerSettings,
    IComponentSettings,
} from '../../../../interfaces/api/Component';
import { IDetailedServer } from '../../../../interfaces/api/Server';
import ComponentSetting from './ComponentSetting/ComponentSetting';
import Style from './ComponentSettings.style';
import { ISharedData } from './ComponentSettings.types';


type Props = {
    open: boolean;
    onClose: () => void;
    settingsTitle: string;
    data: IComponentSettings[];
    serverData: IComponentServerSettings[];
    detailedServer: IDetailedServer;
    currentServerData: (serverData: IComponentServerSettings[], item: IComponentDataTypes) => IComponentServerSettings;
    onComponentSettingChange: (data: IComponentServerSettings[]) => void;
    editServerData: (serverData: IComponentServerSettings[], newData: IComponentServerSettings, name: IComponentDataTypes) => IComponentServerSettings[];
    sharedData: ISharedData;
};

const ComponentSettings: React.FC<Props> = (props: Props) => (
    <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Style.Modal>
            <Paragraph
                css={'margin: 0; padding: 0 0 30px 0; border-bottom: 1px solid darkgrey'}
            >
                {props.settingsTitle}
            </Paragraph>
            <Style.Settings>
                {props.data.map((item: IComponentSettings) =>
                    <ComponentSetting key={item.name}
                        detailedServer={props.detailedServer}
                        data={item}
                        serverData={props.currentServerData(props.serverData, item.name)}
                        onComponentSettingChange={newSettings =>
                            props.onComponentSettingChange(props.editServerData(props.serverData, newSettings, item.name))
                        }
                        isModalOpen={props.open}
                        sharedData={props.sharedData}
                    />,
                )}
            </Style.Settings>
        </Style.Modal>
    </Modal>
);

export default (ComponentSettings);

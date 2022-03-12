import React from 'react';
import { IEditServerData } from '../../store/server/Sagas';
import ItemDisplay from './ItemDisplay/ItemDisplay';
import LeftMenu from './LeftMenu/LeftMenu';


export type DashboardProps = {
    currentServerId?: string;
    onPluginEnabledChange: (event: IEditServerData) => void;
    onComponentEnabledChange: (event: IEditServerData) => void;
    onComponentSettingChange: (data: IEditServerData) => void;
};

const DashboardTemplate: React.FC<DashboardProps> = (props: DashboardProps) => {
    return (
        <React.Fragment>
            <LeftMenu
                currentServerId={props.currentServerId}
                onPluginEnabledChange={props.onPluginEnabledChange}
            />
            <ItemDisplay
                currentServerId={props.currentServerId}
                onComponentEnabledChange={props.onComponentEnabledChange}
                onComponentSettingChange={props.onComponentSettingChange}
            />
        </React.Fragment>
    );
};

export default DashboardTemplate;

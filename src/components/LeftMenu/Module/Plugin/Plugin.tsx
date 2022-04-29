import React from 'react';
import { IFullPluginWithData } from '../../../../interfaces/api/Plugin';
import { IDetailedServer } from '../../../../interfaces/api/Server';
import { IEditServerData } from '../../../../store/server/Sagas';
import PluginLogic from './Plugin.logic';
import PluginTemplate from './Plugin.template';


type Props = {
    data: IFullPluginWithData;
    detailedServer: IDetailedServer;
    onPluginEnabledChange: (event: IEditServerData) => void;
    moduleId: number;
};

const Plugin: React.FC<Props> = (props: Props) => {
    const logic = PluginLogic({
        data: props.data,
        detailedServer: props.detailedServer,
        moduleId: props.moduleId,
    });

    return <PluginTemplate data={props.data}
        onPluginEnabledChange={props.onPluginEnabledChange}
        navigateToPlugin={logic.navigateToPlugin}
        title={logic.title}
    />;
};


export default Plugin;

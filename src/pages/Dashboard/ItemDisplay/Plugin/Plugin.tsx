import React from 'react';
import Loader from '../../../../components/layout/Loader/Loader';
import { IFullModuleWithData } from '../../../../interfaces/api/Module';
import { IDetailedServer } from '../../../../interfaces/api/Server';
import { IEditServerData } from '../../../../store/server/Sagas';
import PluginLogic from './Plugin.logic';
import PluginTemplate from './Plugin.template';


type Props = {
    pluginId: string;
    moduleId: string;
    modules: IFullModuleWithData[];
    detailedServer: IDetailedServer;
    onComponentEnabledChange: (event: IEditServerData) => void;
    onComponentSettingChange: (data: IEditServerData) => void;
};

const Plugin: React.FC<Props> = (props: Props) => {
    const logic = PluginLogic({
        pluginId: props.pluginId,
        moduleId: props.moduleId,
        modules: props.modules,
    });

    if (!logic.plugin) {
        return <Loader centered={true} />;
    }

    return <PluginTemplate plugin={logic.plugin}
        detailedServer={props.detailedServer}
        onComponentEnabledChange={props.onComponentEnabledChange}
        onComponentSettingChange={props.onComponentSettingChange}
    />;
};

export default (Plugin);

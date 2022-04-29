import React from 'react';
import { IFullModuleWithData } from '../../interfaces/api/Module';
import { IFullPluginWithData } from '../../interfaces/api/Plugin';


interface ReturnValue {
    plugin?: IFullPluginWithData;
}

export interface PluginLogicProps {
    modules: IFullModuleWithData[];
    pluginId: string;
    moduleId: string;
}

const PluginLogic = (props: PluginLogicProps): ReturnValue => {
    const module = props.modules.find(moduleItem => moduleItem.id === parseInt(props.moduleId));
    let plugin;

    if (module) {
        plugin = module.plugins.find(pluginItem => pluginItem.id === parseInt(props.pluginId));
    }

    return {
        plugin,
    };
};

export default PluginLogic;

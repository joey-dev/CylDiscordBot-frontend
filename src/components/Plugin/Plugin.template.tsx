import React from 'react';
import { IFullPluginWithData } from '../../interfaces/api/Plugin';
import { IDetailedServer } from '../../interfaces/api/Server';
import { IEditServerData } from '../../store/server/Sagas';
import Component from './Component/Component';
import Style from './Plugin.style';
import PluginHeader from './PluginHeader/PluginHeader';


type Props = {
    plugin: IFullPluginWithData;
    detailedServer: IDetailedServer;
    onComponentEnabledChange: (event: IEditServerData) => void;
    onComponentSettingChange: (data: IEditServerData) => void;
};

const Plugin: React.FC<Props> = (props: Props) => (
    <Style.Background>
        <PluginHeader pluginName={props.plugin.name}
            detailedServer={props.detailedServer}
        />
        {props.plugin.components.map(component =>
            <Component key={component.id}
                component={component}
                detailedServer={props.detailedServer}
                onComponentEnabledChange={props.onComponentEnabledChange}
                onComponentSettingChange={props.onComponentSettingChange}
            />,
        )}
    </Style.Background>
);

export default (Plugin);

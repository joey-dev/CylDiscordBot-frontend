import { ILanguage } from '@cylbot/cyldiscordbotlanguage';
import { IChannelData } from '../../pages/Dashboard/DashboardTemplate/ItemDisplay/PluginBody/Plugin/Component/ComponentSettings/ComponentSetting/componentSettingTypes/ChannelSetting/ChannelSetting';
import { IDeleteReplyData } from '../../pages/Dashboard/DashboardTemplate/ItemDisplay/PluginBody/Plugin/Component/ComponentSettings/ComponentSetting/componentSettingTypes/DeleteReply/DeleteReply';
import { IRoleData } from '../../pages/Dashboard/DashboardTemplate/ItemDisplay/PluginBody/Plugin/Component/ComponentSettings/ComponentSetting/componentSettingTypes/RoleSetting/RoleSetting';

export type IComponentTypes =
    'command';

export interface IComponent {
    id: number,
    name: keyof ILanguage,
    order_id: number;
    data: string;
    type: IComponentTypes;
}

export interface IFullComponent extends IComponent {
}

export interface IFullComponentWithData extends IFullComponent {
    turned_on: boolean;
    server_data: string;
}

export type IComponentDataTypes = 'role' | 'channel' | 'deleteCommand' | 'deleteReply' | 'ephemeral';

export interface IComponentSettings {
    name: IComponentDataTypes;
}

export interface IComponentServerSettings {
    name: IComponentDataTypes;
    turned_on: boolean;
    data: IComponentServerSettingsData;
}

export type IComponentServerSettingsData = object | IRoleData | IChannelData | IDeleteReplyData;

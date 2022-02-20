import { ILanguage } from '@cylbot/cyldiscordbotlanguage';
import { IDeleteReplyData } from '../../pages/Dashboard/DashboardTemplate/ItemDisplay/PluginBody/Plugin/Component/ComponentSettings/ComponentSetting/componentSettingTypes/DeleteReply/DeleteReply';

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

export interface IChannelData {
    channels: IChannelsData[];
}

export interface IChannelsData {
    id: string;
    name: string;
}

export interface IRoleData {
    roles: IRolesData[];
}

export interface IRolesData {
    id: string;
    name: string;
}


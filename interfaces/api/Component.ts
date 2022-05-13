import { ILanguage } from '@cylbot/cyldiscordbotlanguage';

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

export type IComponentDataTypes = 'role' | 'channel' | 'type' | 'deleteCommand' | 'deleteReply' | 'ephemeral';

export interface IComponentSettings {
    name: IComponentDataTypes;
}

export interface IComponentServerSettings {
    name: IComponentDataTypes;
    turned_on: boolean;
    data: IComponentServerSettingsData;
}

export type IComponentServerSettingsData = object | IRoleData | IChannelData | ITypeData | IDeleteReplyData;

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

export interface ITypeData {
    prefix: boolean;
    slash: boolean;
}

export interface IDeleteReplyData {
    second: string;
}

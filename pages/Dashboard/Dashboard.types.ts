import { IEditServerData } from "../../store/server/Sagas";


export type onPluginEnabledChange =  (event: IEditServerData) => boolean;
export type onComponentEnabledChange = (event: IEditServerData) => boolean;
export type onComponentSettingChange = (data: IEditServerData) => boolean;

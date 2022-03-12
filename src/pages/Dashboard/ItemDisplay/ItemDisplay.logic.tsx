import React from 'react';
import { IServer } from '../../../interfaces/api/Server';


type ReturnValue = {
    loading: boolean
    data?: {
        servers: IServer[],
        currentServer?: IServer,
    }
}

const ItemDisplayLogic = (
    servers?: IServer[],
    currentServerId?: string,
): ReturnValue => {
    const returnValue: ReturnValue = {
        loading: true,
    };

    if (!servers) return returnValue;

    const currentServer = servers.find(server => server.id === currentServerId);

    returnValue.data = {
        servers: servers,
        currentServer: currentServer,
    };
    returnValue.loading = false;

    return returnValue;

};

export default ItemDisplayLogic;

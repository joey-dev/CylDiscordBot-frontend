import React from 'react';
import { Params, useParams } from 'react-router-dom';
import { IServer } from '../../../interfaces/api/Server';


type ReturnValue = {
    loading: boolean,
    data?: {
        servers: IServer[],
        currentServer?: IServer,
    },
    params?: Readonly<Params<string>>;

}

type ItemDisplayLogicProps = {
    servers?: IServer[],
    currentServerId?: string,
}

const ItemDisplayLogic = (props: ItemDisplayLogicProps): ReturnValue => {
    const params = useParams();

    if (!props.servers) {
        return {
            loading: false,
        }
    }

    const currentServer = props.servers.find(server => server.id === props.currentServerId);

    const data = {
        servers: props.servers,
        currentServer: currentServer,
    };
    const loading = false;

    return {
        data,
        loading,
        params,
    };

};

export default ItemDisplayLogic;

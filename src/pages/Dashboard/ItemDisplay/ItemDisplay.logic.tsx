import React from 'react';
import { Params, useParams } from 'react-router-dom';
import { IServer } from '../../../interfaces/api/Server';


type ReturnValue = {
    loading: boolean,
    data?: {
        servers: IServer[],
        currentServer?: IServer,
    },
    params?: Readonly<Params>;

}

type ItemDisplayLogicProps = {
    servers?: IServer[],
    currentServerId?: string,
}

const ItemDisplayLogic = (props: ItemDisplayLogicProps): ReturnValue => {
    const params = useParams();

    if (!props.servers) {
        return {
            loading: true,
        }
    }

    const currentServer = props.servers.find(server => server.id === props.currentServerId);

    return {
        data: {
            servers: props.servers,
            currentServer,
        },
        loading: false,
        params,
    };
};

export default ItemDisplayLogic;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IDetailedServer, IServer } from '../../../../interfaces/api/Server';
import ServerItem from './ServerItem/ServerItem';


interface Props {
    currentServerId?: string;
    servers: IServer[];
    server?: IDetailedServer;
}

interface ReturnValue {
    currentServer?: IServer;
    isListOpened: boolean;
    serverList: JSX.Element[];
    setIsListOpened: (value: boolean) => void;
}

function ServerItemsLogic(props: Props): ReturnValue {
    const navigate = useNavigate();
    const [isListOpened, setIsListOpened] = useState(false);
    const [currentServerId, setCurrentServerId] = useState(props.currentServerId);

    let serverList: JSX.Element[] = [];
    let currentServer: IServer | undefined;

    useEffect(() => {
        if (currentServerId === undefined) {
            navigate('/dashboard');
        } else {
            navigate('/dashboard/' + currentServerId);
        }
    }, [currentServerId]);


    for (let server of props.servers) {
        if (currentServerId && server.id === currentServerId) {
            currentServer = server;
        } else {
            serverList.push(<ServerItem key={server.id}
                server={server}
                detailedServer={props.server}
                isCurrentServer={false}
                listOpen={isListOpened}
                onArrowClick={() => setIsListOpened(!isListOpened)}
                onServerClick={(serverId => {
                    setCurrentServerId(serverId);
                    setIsListOpened(false);
                })}
            />);
        }
    }

    return {
        currentServer: currentServer,
        isListOpened: isListOpened,
        setIsListOpened: setIsListOpened,
        serverList: serverList,
    };
}

export default ServerItemsLogic;

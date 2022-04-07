import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ISelectWithLogoAndIconItem
} from '../../../../components/forms/select/SelectWithLogoAndIcon/SelectWithLogoAndIconItem/SelectWithLogoAndIconItem';
import ServerLogo from '../../../../components/images/ServerLogo/ServerLogo';
import { IDetailedServer, IServer } from '../../../../interfaces/api/Server';
import ServerItem, { StyledCheckImg } from './ServerItem/ServerItem';
import check from '../../../../assets/icons/check.svg';
import unCheck from '../../../../assets/icons/uncheck.svg';


interface Props {
    currentServerId?: string;
    servers: IServer[];
    server?: IDetailedServer;
}

interface ReturnValue {
    currentServer?: IServer;
    isListOpened: boolean;
    serverList: ISelectWithLogoAndIconItem[];
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
            serverList.push({
                key: server.id,
                value: {
                    logo: <ServerLogo size={40} server={server}/>
                    text: server.name
                    icon: <StyledCheckImg src={server.alreadyJoined ? check : unCheck} />,
                },
            } as ISelectWithLogoAndIconItem)
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

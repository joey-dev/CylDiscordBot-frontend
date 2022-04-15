import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import check from '../../../../assets/icons/check.svg';
import unCheck from '../../../../assets/icons/uncheck.svg';
import {
    ISelectWithLogoAndIconItem,
} from '../../../../components/forms/select/SelectWithLogoAndIcon/SelectWithLogoAndIconItem/SelectWithLogoAndIconItem';
import ServerLogo from '../../../../components/images/ServerLogo/ServerLogo';
import { IServer } from '../../../../interfaces/api/Server';
import { StyledCheckImg } from './ServerItems.style';


export interface ServerItemsLogicProps {
    currentServerId?: string;
    servers: IServer[];
}

interface ReturnValue {
    currentServer: ISelectWithLogoAndIconItem;
    setCurrentServerId: React.Dispatch<React.SetStateAction<string | undefined>>;
    serverList: ISelectWithLogoAndIconItem[];
}

function ServerItemsLogic(props: ServerItemsLogicProps): ReturnValue {
    const navigate = useNavigate();
    const [currentServerId, setCurrentServerId] = useState(props.currentServerId);

    let serverList: ISelectWithLogoAndIconItem[] = [];
    let currentServer: ISelectWithLogoAndIconItem | undefined = undefined;

    useEffect(() => {
        if (currentServerId === undefined) {
            navigate('/dashboard');
        } else {
            navigate('/dashboard/' + currentServerId);
        }
    }, [currentServerId]);


    for (let server of props.servers) {
        if (currentServerId && server.id === currentServerId) {
            currentServer = {
                key: server.id,
                value: {
                    logo: <ServerLogo size={40}
                        server={server}
                    />,
                    text: server.name,
                    icon: <StyledCheckImg src={server.alreadyJoined ? check : unCheck} />,
                },
            };
        } else {
            serverList.push({
                key: server.id,
                value: {
                    logo: <ServerLogo size={40}
                        server={server}
                    />,
                    text: server.name,
                    icon: <StyledCheckImg src={server.alreadyJoined ? check : unCheck} />,
                },
            } as ISelectWithLogoAndIconItem);
        }
    }

    if (!currentServer) {
        currentServer = {
            value: {
                text: 'Please select a server',
            },
        };
    }

    return {
        currentServer: currentServer,
        setCurrentServerId: setCurrentServerId,
        serverList: serverList,
    };
}

export default ServerItemsLogic;

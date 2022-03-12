import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../../../../components/layout/Loader/Loader';
import { IDetailedServer, IServer } from '../../../../interfaces/api/Server';
import { MapStateToProps } from '../../../../store';
import { ServerStoreState } from '../../../../store/server';
import { UserStoreState } from '../../../../store/user';
import ServerItem from './ServerItem/ServerItem';


const StyledDiv = styled.div`
    margin-top: 10px;
`;

type ServerItemsProps = {
    currentServerId?: string;
};

type Props = UserStoreState & ServerStoreState & ServerItemsProps;

const ServerItems: React.FC<Props> = (props: Props) => {
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

    if (!props.servers) {
        return (
            <Loader />
        );
    }

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

    return (
        <React.Fragment>
            <ServerItem server={currentServer}
                isCurrentServer={true}
                listOpen={isListOpened}
                onArrowClick={() => setIsListOpened(!isListOpened)}
                onServerClick={() => {
                }}
            />
            <StyledDiv>
                {isListOpened && serverList}
            </StyledDiv>
        </React.Fragment>
    );
};

const mapStateToProps = (state: MapStateToProps) => {
    return {
        user: state.user.user,
        servers: state.server.servers,
        server: state.server.server,
        modules: state.server.modules,
    };
};

export default connect(mapStateToProps)(ServerItems);

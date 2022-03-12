import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Loader from '../../../components/layout/Loader/Loader';
import { IFullModuleWithData } from '../../../interfaces/api/Module';
import { IDetailedServer, IServer } from '../../../interfaces/api/Server';
import { MapStateToProps } from '../../../store';
import { ServerStoreState } from '../../../store/server';
import { IEditServerData } from '../../../store/server/Sagas';
import { UserStoreState } from '../../../store/user';
import ModuleList from './ModuleList/ModuleList';
import ServerItems from './ServerItems/ServerItems';


const StyledBackground = styled.div`
    display: block;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 300px;
    background-color: #1F2129;
    color: white;
    height: 100%;
    overflow-y: auto;

    ::-webkit-scrollbar {
        width: 0;
    }
`;

const StyledInnerBackground = styled.div`
    padding: 24px 20px 20px;
`;

type LeftMenuProps = {
    currentServerId?: string;
    onPluginEnabledChange: (event: IEditServerData) => void;
};

type Props = UserStoreState & ServerStoreState & LeftMenuProps;


const LeftMenu: React.FC<Props> = (props: Props) => {
    if (!props.servers) {
        return (
            <Loader />
        )
    }

    return (
        <StyledBackground>
            <StyledInnerBackground>
                <ServerItems currentServerId={props.currentServerId}
                />
                {(props.server !== undefined && props.modules !== undefined) && (
                    <ModuleList server={props.server}
                        modules={props.modules}
                        onPluginEnabledChange={props.onPluginEnabledChange}
                    />
                )}
            </StyledInnerBackground>
        </StyledBackground>
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

export default connect(mapStateToProps)(LeftMenu);

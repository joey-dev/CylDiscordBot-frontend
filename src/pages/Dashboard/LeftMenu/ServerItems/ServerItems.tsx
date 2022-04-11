import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../../../components/layout/Loader/Loader';
import { MapStateToProps } from '../../../../store';
import { ServerStoreState } from '../../../../store/server';
import { setServerStart } from '../../../../store/server/Action';
import { UserStoreState } from '../../../../store/user';
import ServerItemsLogic from './ServerItems.logic';
import ServerItemsTemplate from './ServerItems.template';

type DispatchProps = {
    getServerStart: (server_id: string) => void;
};

type ServerItemsProps = {
    currentServerId?: string;
};

type Props = UserStoreState & ServerStoreState & ServerItemsProps & DispatchProps;

const ServerItems: React.FC<Props> = (props: Props) => {
    if (!props.servers) {
        return (
            <Loader centered={true} />
        );
    }

    const logic = ServerItemsLogic({
        currentServerId: props.currentServerId,
        servers: props.servers,
        server: props.server,
    });

    return <ServerItemsTemplate
        serverList={logic.serverList}
        currentServer={logic.currentServer}
        serverSelected={(server_id) => {
            props.getServerStart(server_id);
            logic.setCurrentServerId(server_id);
        }}
    />;

};

const mapStateToProps = (state: MapStateToProps) => {
    return {
        user: state.user.user,
        servers: state.server.servers,
        server: state.server.server,
        modules: state.server.modules,
    };
};

type DispatchPropsArgs = {
    type: string;
};

const mapDispatchToProps = (dispatch: (arg0: DispatchPropsArgs) => void) => {
    return {
        getServerStart: (server_id: string) => dispatch(setServerStart(server_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerItems);

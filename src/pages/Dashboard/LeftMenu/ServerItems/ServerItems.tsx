import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../../../components/layout/Loader/Loader';
import { MapStateToProps } from '../../../../store';
import { ServerStoreState } from '../../../../store/server';
import { UserStoreState } from '../../../../store/user';
import ServerItemsLogic from './ServerItems.logic';
import ServerItemsTemplate from './ServerItems.template';


type ServerItemsProps = {
    currentServerId?: string;
};

type Props = UserStoreState & ServerStoreState & ServerItemsProps;

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

    return <ServerItemsTemplate isListOpened={logic.isListOpened}
        serverList={logic.serverList}
        setIsListOpened={logic.setIsListOpened}
        currentServer={logic.currentServer}
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

export default connect(mapStateToProps)(ServerItems);

import React from 'react';
import { connect } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { MapStateToProps } from '../../store';
import { ServerStoreState } from '../../store/server';
import { IEditServerData } from '../../store/server/Sagas';
import { UserStoreState } from '../../store/user';
import LeftMenuTemplate from './LeftMenu.template';


type LeftMenuProps = {
    currentServerId?: string;
    onPluginEnabledChange: (event: IEditServerData) => void;
};

type Props = UserStoreState & ServerStoreState & LeftMenuProps;


const LeftMenu: React.FC<Props> = (props: Props) => {
    if (!props.servers) {
        return (
            <Loader />
        );
    }

    return <LeftMenuTemplate currentServerId={props.currentServerId}
        modules={props.modules}
        server={props.server}
        onPluginEnabledChange={props.onPluginEnabledChange}
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

export default connect(mapStateToProps)(LeftMenu);

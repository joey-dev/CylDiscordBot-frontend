import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/layout/Loader/Loader';
import { IUserLogin } from '../../interfaces/api/User';
import { MapStateToProps } from '../../store';
import { ServerStoreState } from '../../store/server';
import { editServerDataStart, setServersStart, setServerStart } from '../../store/server/Action';
import { IEditServerData } from '../../store/server/Sagas';
import { UserStoreState } from '../../store/user';
import { getUserStart } from '../../store/user/Action';
import UseDashboardLogic from './Dashboard.logic';
import DashboardTemplate from './Dashboard.template';

type DispatchProps = {
    getUserStart: (user: IUserLogin) => void;
    getServersStart: () => void;
    getServerStart: (server_id: string) => void;
    editServerDataStart: (server_id: string, data: IEditServerData) => void,
};

type Props = UserStoreState & DispatchProps & ServerStoreState;

const Dashboard: React.FC<Props> = (props: Props) => {
    const logic = UseDashboardLogic({
        editServerDataStart: props.editServerDataStart,
        getServersStart: props.getServersStart,
        getServerStart: props.getServerStart,
        user: props.user,
        loading: props.loading,
        servers: props.servers,
    });

    if (!logic.data || logic.loading) {
        return <Loader centered={true} />;
    }

    return <DashboardTemplate
        currentServerId={logic.data.currentServerId}
        onPluginEnabledChange={logic.data.onPluginEnabledChange}
        onComponentEnabledChange={logic.data.onComponentEnabledChange}
        onComponentSettingChange={logic.data.onComponentSettingChange}
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
    isSignUp?: boolean;
    path?: string;
};

const mapDispatchToProps = (dispatch: (arg0: DispatchPropsArgs) => void) => {
    return {
        getUserStart: (user: IUserLogin) => dispatch(getUserStart(user)),
        getServersStart: () => dispatch(setServersStart()),
        getServerStart: (server_id: string) => dispatch(setServerStart(server_id)),
        editServerDataStart: (server_id: string, data: IEditServerData) => dispatch(editServerDataStart(server_id, data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

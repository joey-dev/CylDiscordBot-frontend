import React from "react";
import { useSelector } from "react-redux";
import { IFullModuleWithData } from "../../interfaces/api/Module";
import { IDetailedServer, IServer } from "../../interfaces/api/Server";
import { IUser } from "../../interfaces/api/User";
import { MapStateToProps } from "../../store";


interface DashboardRedux {
	user?: IUser,
	server?: IDetailedServer,
	servers?: IServer[],
	modules?: IFullModuleWithData[],
	loading: boolean,
}

interface DashboardReduxReturnValue {
	selector: DashboardRedux,
}

function UseDashboardRedux(): DashboardReduxReturnValue {
	const selector = useSelector<MapStateToProps, DashboardRedux>(state => {
		return {
			user: state.user.user,
			server: state.server.server,
			servers: state.server.servers,
			modules: state.server.modules,
			loading: state.server.loading || state.user.loading || state.auth.loading,
		};
	});


	return {
		selector,
	};
}

export default UseDashboardRedux;

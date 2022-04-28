import React from "react";
import { useSelector } from "react-redux";
import { IFullModuleWithData } from "../../interfaces/api/Module";
import { IDetailedServer, IServer } from "../../interfaces/api/Server";
import { IUser } from "../../interfaces/api/User";
import { MapStateToProps } from "../../store";


interface DashboardReduxReturnValue {
	user?: IUser,
	server?: IDetailedServer,
	servers?: IServer[],
	modules?: IFullModuleWithData[],
	loading: boolean,
}

function UseDashboardRedux(): DashboardReduxReturnValue {
	const selector = useSelector<MapStateToProps, DashboardReduxReturnValue>(state => {
		return {
			user: state.user.user,
			server: state.server.server,
			servers: state.server.servers,
			modules: state.server.modules,
			loading: state.server.loading || state.user.loading || state.auth.loading,
		};
	});


	return {
		...selector,
	};
}

export default UseDashboardRedux;

import React from "react";
import { connect } from "react-redux";
import Loader from "../../components/layout/Loader/Loader";
import { IUserLogin } from "../../interfaces/api/User";
import { editServerDataStart, setServersStart, setServerStart } from "../../store/server/Action";
import { IEditServerData } from "../../store/server/Sagas";
import { getUserStart } from "../../store/user/Action";
import UseDashboardLogic from "./Dashboard.logic";
import UseDashboardRedux from "./Dashboard.redux";
import DashboardTemplate from "./Dashboard.template";

type DispatchProps = {
	getUserStart: (user: IUserLogin) => void;
	getServersStart: () => void;
	getServerStart: (server_id: string) => void;
	editServerDataStart: (server_id: string, data: IEditServerData) => void,
};

type Props = DispatchProps;

const Dashboard: React.FC = () => {
	const {
		selector,
	} = UseDashboardRedux();

	const logic = UseDashboardLogic({
		user: selector.user,
		loading: selector.loading,
		servers: selector.servers,
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
		editServerDataStart: (
			server_id: string,
			data: IEditServerData,
		) => dispatch(editServerDataStart(server_id, data)),
	};
};

export default connect(null, mapDispatchToProps)(Dashboard);

import React from "react";
import Loader from "../../components/layout/Loader/Loader";
import UseDashboardLogic from "./Dashboard.logic";
import UseDashboardRedux from "./Dashboard.redux";
import DashboardTemplate from "./Dashboard.template";


const Dashboard: React.FC = () => {
	if (typeof window === "undefined") {
		return <Loader centered={true} />;
	}

	const redux = UseDashboardRedux();

	const logic = UseDashboardLogic({
		user: redux.user,
		loading: redux.loading,
		servers: redux.servers,
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

export default Dashboard;

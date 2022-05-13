import React from "react";
import { connect } from "react-redux";
import { MapStateToProps } from "../../../store";
import { ServerStoreState } from "../../../store/server";
import { setServerStart } from "../../../store/server/Action";
import { UserStoreState } from "../../../store/user";
import Loader from "../../layout/Loader/Loader";
import ServerItemsLogic from "./ServerItems.logic";
import ServerItemsTemplate from "./ServerItems.template";

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
	});

	return <ServerItemsTemplate
		serverList={logic.serverList}
		currentServer={logic.currentServer}
		serverSelected={(server_id) => {
			console.log("server_id", server_id);
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

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IServer } from "../../interfaces/api/Server";
import { IUser } from "../../interfaces/api/User";
import { AppDispatch } from "../../store";
import { editServerDataStart, setServersStart, setServerStart } from "../../store/server/Action";
import { IEditServerData } from "../../store/server/Sagas";
import { onComponentEnabledChange, onComponentSettingChange, onPluginEnabledChange } from "./Dashboard.types";


interface DashboardLogicReturnValue {
	loading: boolean;
	data?: {
		servers: IServer[];
		currentServerId?: string;
		onPluginEnabledChange: onPluginEnabledChange,
		onComponentEnabledChange: onComponentEnabledChange,
		onComponentSettingChange: onComponentSettingChange,
	};
}

export interface DashboardLogicProps {
	user?: IUser,
	loading?: boolean,
	servers?: IServer[],
}

function UseDashboardLogic(props: DashboardLogicProps): DashboardLogicReturnValue {
	const navigate = useNavigate();
	const params = useParams();
	const currentServerId = params.serverId;
	const dispatch = useDispatch<AppDispatch>();

	const returnValue: DashboardLogicReturnValue = {
		loading: true,
	};

	useEffect(() => {
		dispatch(setServersStart());
	}, []);

	useEffect(() => {
		if (props.user === undefined) {
			navigate("/");
		}
	}, [props.user, navigate]);

	useEffect(() => {
		if (currentServerId) {
			dispatch(setServerStart(currentServerId));
		}
	}, [currentServerId]);

	const onComponentOrPluginSettingsChange = (event: IEditServerData): boolean => {
		if (currentServerId) {
			dispatch(editServerDataStart(currentServerId, event));
			return true;
		}

		return false;
	};


	if (!props.loading && props.servers !== undefined) {
		returnValue.data = {
			servers: props.servers,
			currentServerId: currentServerId,
			onPluginEnabledChange: onComponentOrPluginSettingsChange,
			onComponentEnabledChange: onComponentOrPluginSettingsChange,
			onComponentSettingChange: onComponentOrPluginSettingsChange,
		};

		returnValue.loading = false;
	}

	return returnValue;
}

export default UseDashboardLogic;

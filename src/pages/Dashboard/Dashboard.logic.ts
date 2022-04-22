import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IServer } from '../../interfaces/api/Server';
import { IUser } from '../../interfaces/api/User';
import { IEditServerData } from '../../store/server/Sagas';


type ReturnValue = {
    loading: boolean;
    data?: {
        servers: IServer[];
        currentServerId?: string;
        onPluginEnabledChange: (event: IEditServerData) => boolean;
        onComponentEnabledChange: (event: IEditServerData) => boolean;
        onComponentSettingChange: (data: IEditServerData) => boolean;
    };
}

export type DashboardLogicProps = {
    editServerDataStart: (server_id: string, data: IEditServerData) => void,
    getServersStart: () => void,
    getServerStart: (server_id: string) => void
    user?: IUser,
    loading?: boolean,
    servers?: IServer[],
}

function UseDashboardLogic(props: DashboardLogicProps): ReturnValue {
    const navigate = useNavigate();
    const params = useParams();
    const currentServerId = params.serverId;

    const returnValue: ReturnValue = {
        loading: true,
    };

    useEffect(() => {
        props.getServersStart();
    }, []);

    useEffect(() => {
        if (props.user === undefined) {
            navigate('/');
        }
    }, [props.user, navigate]);

    useEffect(() => {
        if (currentServerId) {
            props.getServerStart(currentServerId);
        }
    }, [currentServerId]);

    const onComponentOrPluginSettingsChange = (event: IEditServerData): boolean => {
        if (currentServerId) {
            props.editServerDataStart(currentServerId, event);
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

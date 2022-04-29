import React from 'react';
import { connect, useSelector } from 'react-redux';
import Loader from '../../../components/layout/Loader/Loader';
import { MapStateToProps } from '../../../store';
import { ServerStoreState } from '../../../store/server';
import { IEditServerData } from '../../../store/server/Sagas';
import { UserStoreState } from '../../../store/user';
import ItemDisplayLogic from './ItemDisplay.logic';
import ItemDisplayTemplate from './ItemDisplay.template';


type ItemDisplayProps = {
    currentServerId?: string;
    onComponentEnabledChange: (event: IEditServerData) => void;
    onComponentSettingChange: (data: IEditServerData) => void;
};

type Props = UserStoreState & ServerStoreState & ItemDisplayProps;

const ItemDisplay: React.FC<Props> = (props: Props) => {
    const logic = ItemDisplayLogic({
        servers: props.servers,
        currentServerId: props.currentServerId,
    });

    if (!logic.data || logic.loading) {
        return (
            <Loader />
        );
    }

    return <ItemDisplayTemplate
        currentServerId={props.currentServerId}
        currentServer={logic.data.currentServer}
        server={props.server}
        modules={props.modules}
        onComponentEnabledChange={props.onComponentEnabledChange}
        onComponentSettingChange={props.onComponentSettingChange}
        params={logic.params}
    />;
};


const mapStateToProps = (state: MapStateToProps) => {
    return {
        modules: state.server.modules,
        servers: state.server.servers,
        server: state.server.server,
    };
};

export default connect(mapStateToProps)(ItemDisplay);

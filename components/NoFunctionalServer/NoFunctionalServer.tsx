import React from 'react';
import { connect } from 'react-redux';
import { IServer } from '../../interfaces/api/Server';
import { MapStateToProps } from '../../store';
import { websiteStoreState } from '../../store/website';
import NoFunctionalServerLogic from './NoFunctionalServer.logic';
import NoFunctionalServerTemplate from './NoFunctionalServer.template';


type HeaderProps = {
    server?: IServer;
    currentServerId?: string;
};

type Props = HeaderProps & websiteStoreState;

const NoFunctionalServer: React.FC<Props> = (props: Props) => {
    const logic = NoFunctionalServerLogic({
        currentServerId: props.currentServerId,
        server: props.server,
        language: props.language,
    });

    return <NoFunctionalServerTemplate
        addBotToServerUrl={logic.addBotToServerUrl}
        text={logic.text}
        setupMessage={logic.setupMessage}
        showAddBotButton={logic.showAddBotButton}
    />;
};

const mapStateToProps = (state: MapStateToProps) => {
    return {
        language: state.website.language,
    };
};

export default connect(mapStateToProps)(NoFunctionalServer);

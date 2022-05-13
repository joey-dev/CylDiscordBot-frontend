import { getItemTranslate } from '@cylbot/cyldiscordbotlanguage';
import React from 'react';
import { IServer } from '../../interfaces/api/Server';
import { IDisplayLanguage } from '../../store/website';


export type NoFunctionalServerLogicReturnValue = {
    addBotToServerUrl: string;
    text: {
        botSetupButton: string;
        whenFinishedBotSetup: string;
        finish: string;
    },
    setupMessage: string;
    showAddBotButton: boolean;
}

export type NoFunctionalServerLogicProps = {
    currentServerId?: string;
    language: IDisplayLanguage;
    server?: IServer;
}


const NoFunctionalServerLogic = (props: NoFunctionalServerLogicProps): NoFunctionalServerLogicReturnValue => {
    const addBotToServerUrl = `https://discord.com/api/oauth2/authorize?
        client_id=794964425819160587&
        permissions=2080374975&
        redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fserver%2Fredirect&
        scope=bot%20applications.commands&
        guild_id= + ${props.currentServerId}
    `;

    const botSetupButtonText = getItemTranslate(props.language.key, 'BOT_SETUP_BUTTON');
    const whenFinishedBotSetupText = getItemTranslate(props.language.key, 'WHEN_FINISHED_BOT_SETUP');
    const finishText = getItemTranslate(props.language.key, 'FINISH');

    let setupMessage = '';
    let showAddBotButton = false;

    if (props.server === undefined) {
        setupMessage = getItemTranslate(props.language.key, 'NO_SERVER_SELECTED');
    } else if (!props.server.alreadyJoined) {
        setupMessage = getItemTranslate(props.language.key, 'BOT_NOT_SETUP');
        showAddBotButton = true;
    }

    return {
        addBotToServerUrl,
        text: {
            botSetupButton: botSetupButtonText,
            whenFinishedBotSetup: whenFinishedBotSetupText,
            finish: finishText,
        },
        setupMessage,
        showAddBotButton,
    };
};

export default NoFunctionalServerLogic;

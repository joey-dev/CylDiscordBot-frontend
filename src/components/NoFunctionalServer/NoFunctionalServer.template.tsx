import React from 'react';
import Button from '../forms/Button/Button';


type Props = {
    addBotToServerUrl: string;
    text: {
        botSetupButton: string;
        whenFinishedBotSetup: string;
        finish: string;
    },
    setupMessage: string;
    showAddBotButton: boolean;
};

const NoFunctionalServerTemplate: React.FC<Props> = (props: Props) => (
    <>
        {props.setupMessage && (
            <p>{props.setupMessage}</p>
        )}
        {props.showAddBotButton && (
            <>
                <Button
                    variant="text"
                    onClick={() => {
                        window.open(props.addBotToServerUrl, '_blank');
                    }}
                >
                    {props.text.botSetupButton}
                </Button>

                <p>
                    {props.text.whenFinishedBotSetup}
                </p>
                <Button
                    variant="text"
                    onClick={() => {
                        window.location.reload();
                    }}
                >
                    {props.text.finish}
                </Button>
            </>
        )}
    </>
);


export default NoFunctionalServerTemplate;

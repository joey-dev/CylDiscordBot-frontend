import { getItemTranslate } from '@cylbot/cyldiscordbotlanguage/index';
import { QuestionMark } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Switch from '../../../../../../../../../../components/forms/Switch/Switch';
import Paragraph from '../../../../../../../../../../components/text/Paragraph/Paragraph';
import { IComponentServerSettings } from '../../../../../../../../../../interfaces/api/Component';
import { IDetailedServer } from '../../../../../../../../../../interfaces/api/Server';
import { ISharedData } from '../../../ComponentSettings';


const StyledSwitch = styled.div`
    text-align: right;
    padding: 7px 0;
`;

type Props = {
    settings: IComponentServerSettings;
    detailedServer: IDetailedServer;
    onComponentSettingChange: (data: IComponentServerSettings) => void;
    isModalOpen: boolean;
    sharedData: ISharedData;
};

const Ephemeral: React.FC<Props> = (props: Props) => {
    const languageName = props.detailedServer.language.small_name;
    const EphemeralSwitchDescription = getItemTranslate(languageName, 'SETTINGS_EPHEMERAL_TITLE');
    const EphemeralSwitchDetailedDescription = getItemTranslate(languageName, 'SETTINGS_EPHEMERAL_DESCRIPTION');

    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if (props.sharedData.type.prefix && !props.sharedData.type.slash || props.sharedData.deleteReply && !props.sharedData.type.prefix) {
            setDisabled(true);
            props.onComponentSettingChange(
                {...props.settings, ...{turned_on: false}},
            )
        } else {
            setDisabled(false);
        }
    }, [props.sharedData.type.prefix, props.sharedData.type.slash, props.sharedData.deleteReply]);


    return (
        <div>
            <Paragraph
                size={'small'}
                css={'float: left'}
            >{EphemeralSwitchDescription}</Paragraph>
            <Tooltip title={EphemeralSwitchDetailedDescription}>
                <IconButton sx={{width: '20px', float: 'left'}}>
                    <QuestionMark sx={{width: '20px'}} />
                </IconButton>
            </Tooltip>
            <StyledSwitch>
                <Switch
                    onChange={() => (
                        props.onComponentSettingChange(
                            {...props.settings, ...{turned_on: !props.settings.turned_on}},
                        )
                    )}
                    checked={props.settings.turned_on}
                    disabled={disabled}
                />
            </StyledSwitch>
        </div>
    );
};


export default Ephemeral;

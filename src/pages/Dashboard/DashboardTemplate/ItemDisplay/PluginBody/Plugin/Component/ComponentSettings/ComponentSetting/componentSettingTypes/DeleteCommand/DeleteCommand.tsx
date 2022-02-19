import { getItemTranslate } from '@cylbot/cyldiscordbotlanguage/index';
import { QuestionMark } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import Switch from '../../../../../../../../../../../components/forms/Switch/Switch';
import Paragraph from '../../../../../../../../../../../components/text/Paragraph/Paragraph';
import { IComponentServerSettings } from '../../../../../../../../../../../interfaces/api/Component';
import { IDetailedServer } from '../../../../../../../../../../../interfaces/api/Server';


const StyledSetting = styled.div`
`;

const StyledAutoComplete = styled.div`
`;

const StyledSwitch = styled.div`
    text-align: right;
    padding: 7px 0;
`;

type Props = {
    settings: IComponentServerSettings;
    detailedServer: IDetailedServer;
    onComponentSettingChange: (data: IComponentServerSettings) => void;
    isModalOpen: boolean;
};

const DeleteCommand: React.FC<Props> = (props: Props) => {
    const languageName = props.detailedServer.language.small_name;
    const deleteCommandsSwitchDescription = getItemTranslate(languageName, 'SETTINGS_DELETE_COMMAND_TITLE');
    const deleteCommandsSwitchDetailedDescription = getItemTranslate(languageName, 'SETTINGS_DELETE_COMMAND_DESCRIPTION');


    return (
        <StyledSetting>
            <Paragraph size={'small'}
                css={'float: left'}
            >{deleteCommandsSwitchDescription}</Paragraph>
            <Tooltip title={deleteCommandsSwitchDetailedDescription}>
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
                />
            </StyledSwitch>
        </StyledSetting>
    );
};


export default DeleteCommand;

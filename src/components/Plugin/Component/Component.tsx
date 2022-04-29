import { getItemTranslate, ILanguage } from '@cylbot/cyldiscordbotlanguage/index';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../forms/Button/Button';
import Switch from '../../forms/Switch/Switch';
import Paragraph from '../../text/Paragraph/Paragraph';
import ComponentSettings from './ComponentSettings/ComponentSettings';
import { IFullComponentWithData } from '../../../interfaces/api/Component';
import { IDetailedServer } from '../../../interfaces/api/Server';
import { IEditServerData } from '../../../store/server/Sagas';


const StyledBackground = styled.div`
    background-color: #1F2129;
    width: calc(100% - 150px);
    margin: 0 0 20px;;
    border-radius: 5px;
    display: grid;
    align-items: center;
    padding: 0 25px;
`;

const StyledLeftDiv = styled.div`
    grid-column-start: 1;
    grid-column-end: 4;
`;

const StyledRightDiv = styled.div`
    float: right;
    grid-column-start: 4;
    text-align: right;
`;

type Props = {
    component: IFullComponentWithData;
    detailedServer: IDetailedServer;
    onComponentEnabledChange: (event: IEditServerData) => void;
    onComponentSettingChange: (data: IEditServerData) => void;
};

const Component: React.FC<Props> = (props: Props) => {
    const [componentSettingsOpen, setComponentSettingsOpen] = useState(false);
    const languageName = props.detailedServer.language.small_name;
    const descriptionKey = `${props.component.name}_DESCRIPTION` as keyof ILanguage;

    let prefix = '';
    if (props.component.type === 'command') {
        prefix = props.detailedServer.command_prefix;
    }

    return (
        <StyledBackground>
            <StyledLeftDiv>
                <Paragraph
                    color="white"
                    css={"margin: 0; padding: 10px 0"}
                >
                    {prefix}{getItemTranslate(languageName, props.component.name)}
                </Paragraph>
                <Paragraph size={"small"}
                    css={"margin: 0; padding: 0 0 15px"}
                    color="darkGrey"
                >
                    {getItemTranslate(languageName, descriptionKey)}
                </Paragraph>
            </StyledLeftDiv>
            <StyledRightDiv>
                <Button variant="outlined"
                    onClick={() => setComponentSettingsOpen(true)}
                >
                    edit
                </Button>
                <ComponentSettings open={componentSettingsOpen}
                    detailedServer={props.detailedServer}
                    onClose={() => setComponentSettingsOpen(false)}
                    component={props.component}
                    onComponentSettingChange={data => props.onComponentSettingChange({
                        component_id: props.component.id,
                        server_data: data,
                        checked: props.component.turned_on,
                        type: 'component',
                    })}
                />
                <Switch
                    checked={props.component.turned_on}
                    onChange={event => props.onComponentEnabledChange({
                        checked: event.target.checked,
                        component_id: props.component.id,
                        type: 'component',
                    })}
                />
            </StyledRightDiv>
        </StyledBackground>
    );
};


export default (Component);

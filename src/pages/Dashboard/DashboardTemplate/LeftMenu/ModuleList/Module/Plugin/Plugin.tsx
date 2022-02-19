import { getItemTranslate } from '@cylbot/cyldiscordbotlanguage/index';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Switch from '../../../../../../../components/forms/Switch/Switch';
import Icon from '../../../../../../../components/images/Icon/Icon';
import Paragraph from '../../../../../../../components/text/Paragraph/Paragraph';
import { IFullPluginWithData } from '../../../../../../../interfaces/api/Plugin';
import { IDetailedServer } from '../../../../../../../interfaces/api/Server';
import CapitalizeFirstLetter from '../../../../../../../services/stringManipulation/CapitalizeFirstLetter';
import { IEditServerData } from '../../../../../../../store/server/Sagas';


const StyledDiv = styled.div`
    text-align: left;
`;

const StyledSwitchDiv = styled.div`
    float: right;
    position: relative;
    top: -52px;
`;

type Props = {
    data: IFullPluginWithData;
    detailedServer: IDetailedServer;
    onPluginEnabledChange: (event: IEditServerData) => void;
    moduleId: number;
};

const Plugin: React.FC<Props> = (props: Props) => {
    const navigate = useNavigate();
    const params = useParams();
    const currentServerId = params.serverId;
    const languageName = props.detailedServer.language.small_name;


    const navigateToPlugin = () => navigate(`/dashboard/${currentServerId}/${props.moduleId}/${props.data.id}`);

    return (
        <StyledDiv>
            <Icon name="utility"
                float={'left'}
            />
            <Paragraph
                onClick={navigateToPlugin}
                css={"margin: 20px 40px"}
            >
                {CapitalizeFirstLetter(getItemTranslate(languageName, props.data.name))}
            </Paragraph>
            <StyledSwitchDiv>
                <Switch
                    onChange={event => props.onPluginEnabledChange({
                        checked: event.target.checked,
                        plugin_id: props.data.id,
                        type: 'plugin',
                    })}
                    checked={props.data.turned_on}
                />
            </StyledSwitchDiv>
        </StyledDiv>
    );
};


export default Plugin;

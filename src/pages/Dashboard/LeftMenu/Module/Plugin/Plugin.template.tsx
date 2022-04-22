import React from 'react';
import Switch from '../../../../../components/forms/Switch/Switch';
import Icon from '../../../../../components/images/Icon/Icon';
import Paragraph from '../../../../../components/text/Paragraph/Paragraph';
import { IFullPluginWithData } from '../../../../../interfaces/api/Plugin';
import { IEditServerData } from '../../../../../store/server/Sagas';
import { StyledPluginDiv, StyledPluginSwitchDiv } from './Plugin.style';


type Props = {
    data: IFullPluginWithData;
    onPluginEnabledChange: (event: IEditServerData) => void;
    navigateToPlugin: () => void;
    title: string;
};

const PluginTemplate: React.FC<Props> = (props: Props) => (
    <StyledPluginDiv>
        <Icon name="utility"
            float={'left'}
        />
        <Paragraph
            onClick={props.navigateToPlugin}
            css={'margin: 20px 40px'}
        >
            {props.title}
        </Paragraph>
        <StyledPluginSwitchDiv>
            <Switch
                onChange={event => props.onPluginEnabledChange({
                    checked: event.target.checked,
                    plugin_id: props.data.id,
                    type: 'plugin',
                })}
                checked={props.data.turned_on}
            />
        </StyledPluginSwitchDiv>
    </StyledPluginDiv>
);


export default PluginTemplate;

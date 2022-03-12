import { getItemTranslate } from '@cylbot/cyldiscordbotlanguage/index';
import { QuestionMark } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Switch from '../../../../../../../../../../components/forms/Switch/Switch';
import Paragraph from '../../../../../../../../../../components/text/Paragraph/Paragraph';
import { IRolesData, IComponentServerSettings } from '../../../../../../../../../../interfaces/api/Component';
import { IDetailedServer } from '../../../../../../../../../../interfaces/api/Server';
import CapitalizeFirstLetter from '../../../../../../../../../../services/stringManipulation/CapitalizeFirstLetter';
import { MapStateToProps } from '../../../../../../../../../../store';
import { ServerStoreState } from '../../../../../../../../../../store/server';
import { getServerChannelsStart } from '../../../../../../../../../../store/server/Action';
import ChannelSettingAutoComplete from './ChannelSettingAutoComplete';


const StyledSwitch = styled.div`
    text-align: right;
    padding: 7px 0;
`;

type ChannelSettingsProps = {
    settings: IComponentServerSettings;
    detailedServer: IDetailedServer;
    onComponentSettingChange: (data: IComponentServerSettings) => void;
    isModalOpen: boolean;
};

type DispatchProps = {
    getServerChannelsStart: (serverId: string) => void,
};

type Props = ChannelSettingsProps & DispatchProps & ServerStoreState;

const ChannelSetting: React.FC<Props> = (props: Props) => {
    if (!hasCorrectData(props.settings.data)) {
        throw new Error('data for channel settings is incorrect!');
    }

    const [selectedChannels, setSelectedChannels] = useState<IRolesData[]>([]);
    const params = useParams();

    useEffect(() => {
        if (props.isModalOpen) {
            getChannels();
        }
    }, [props.isModalOpen]);

    useEffect(() => {
        if ('channels' in props.settings.data) {
            setSelectedChannels(props.settings.data.channels);
        }
    }, [props.settings.data]);

    const getChannels = (): void => {
        if (params.serverId) {
            props.getServerChannelsStart(params.serverId);
        }
    };

    const languageName = props.detailedServer.language.small_name;
    const channelsName = getItemTranslate(languageName, 'CHANNELS');
    const channelsSwitchDescription = getItemTranslate(languageName, 'SETTINGS_CHANNELS_TITLE');
    const channelsSwitchDetailedDescription = getItemTranslate(languageName, 'SETTINGS_CHANNELS_DESCRIPTION');
    const enabledName = CapitalizeFirstLetter(getItemTranslate(languageName, 'ENABLED'));
    const disabledName = CapitalizeFirstLetter(getItemTranslate(languageName, 'DISABLED'));


    return (
        <div>
            <Paragraph size={'small'}
                css={'float: left'}
            >{channelsSwitchDescription}</Paragraph>
            <Tooltip title={channelsSwitchDetailedDescription}>
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
            <Paragraph size={'small'}>
                {props.settings.turned_on ? enabledName : disabledName} {channelsName}:
            </Paragraph>
            <div>
                <ChannelSettingAutoComplete
                    channels={props.channels}
                    name={channelsName}
                    getItems={getChannels}
                    onComponentSettingChange={props.onComponentSettingChange}
                    settings={props.settings}
                    selectedChannels={selectedChannels}
                    setSelectedChannels={setSelectedChannels}
                />
            </div>
        </div>
    );
};

const hasCorrectData = (data: object): boolean => 'channels' in data;

const mapStateToProps = (state: MapStateToProps) => {
    return {
        channels: state.server.channels,
    };
};

type DispatchPropsArgs = {
    type: string;
    isSignUp?: boolean;
    path?: string;
};

const mapDispatchToProps = (dispatch: (arg0: DispatchPropsArgs) => void) => {
    return {
        getServerChannelsStart: (serverId: string) => dispatch(getServerChannelsStart(serverId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelSetting);

import { ILanguage, ILanguages } from '@cylbot/cyldiscordbotlanguage';
import { getItemTranslate } from '@cylbot/cyldiscordbotlanguage/index';
import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IChannelsData, IComponentServerSettings, IRolesData } from '../../../../interfaces/api/Component';
import { MapStateToProps } from '../../../../store';
import { ServerStoreState } from '../../../../store/server';
import { getServerChannelsStart, getServerRolesStart } from '../../../../store/server/Action';
import Switch from '../../Switch/Switch';
import AutoComplete, { IAutoCompleteData, IAutoCompleteDataType } from '../util/AutoComplete/AutoComplete';
import Title from '../util/Title/Title';
import Tooltip from '../util/Tooltip/Tooltip';
import RolesCleanup from './cleanup/RolesCleanup';


const StyledSetting = styled.div`
`;

const StyledAutoComplete = styled.div`
`;

const StyledSwitch = styled.div`
    text-align: right;
    padding: 7px 0;
`;


interface ComponentProps {
    settings: IComponentServerSettings;
    onComponentSettingChange: (data: IComponentServerSettings) => void;
    isModalOpen: boolean;
    languageName: keyof ILanguages,
    text: {
        name: keyof ILanguage;
        switchName: keyof ILanguage;
        switchDescription: keyof ILanguage;
        enabled: keyof ILanguage;
        disabled: keyof ILanguage;
    },
    type: IAutoCompleteDataType;
}

type DispatchProps = {
    getServerRolesStart: (serverId: string) => void,
    getServerChannelsStart: (serverId: string) => void,
};

type Props = ComponentProps & DispatchProps & ServerStoreState;

const AutoCompleteWithSwitch: React.FC<Props> = (props: Props) => {
    if (!hasCorrectData(props.settings.data)) {
        throw new Error('data for autoCompleteWithSwitch settings is incorrect!');
    }

    const [selectedData, setSelectedData] = useState<IAutoCompleteData[]>([]);
    const params = useParams();

    const data = useMemo(() => {
        if (props.type === 'roles' && props.roles) {
            return convertPreciseDataToAutoCompleteData(props.roles);
        }
        if (props.type === 'channels' && props.channels) {
            console.log(props.channels);
            return convertPreciseDataToAutoCompleteData(props.channels);
        }
    }, [props.channels, props.roles, props.type]);

    const SetSelectedDataFromRolesData = (data: IRolesData[]) => {
        setSelectedData(convertPreciseDataToAutoCompleteData(data));
    };

    const SetSelectedDataFromChannelsData = (data: IChannelsData[]) => {
        setSelectedData(convertPreciseDataToAutoCompleteData(data));
    };

    useEffect(() => {
        if (props.isModalOpen) {
            getData();
        }
    }, [props.isModalOpen]);

    useEffect(() => {
        if ('roles' in props.settings.data && props.type === 'roles') {
            SetSelectedDataFromRolesData(props.settings.data.roles);
        } else if ('channels' in props.settings.data && props.type === 'channels') {
            SetSelectedDataFromChannelsData(props.settings.data.channels);
        }
    }, [props.settings.data]);

    useEffect(() => {
        if (props.type === 'roles') {
            RolesCleanup({
                selectedData: selectedData,
                roles: props.roles,
                onComponentSettingChange: props.onComponentSettingChange,
                settings: props.settings,
            });
        }
    }, [selectedData, props.roles]);


    const getData = (): void => {
        if (params.serverId) {
            if (props.type === "roles") {
                props.getServerRolesStart(params.serverId);
            } else if (props.type === "channels") {
                props.getServerChannelsStart(params.serverId);
            }
        }
    };

    return (
        <StyledSetting>
            <Title title={props.text.switchName}
                languageName={props.languageName}
            />
            <Tooltip title={props.text.switchDescription}
                languageName={props.languageName}
            />
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
            <Title title={props.settings.turned_on ? props.text.enabled : props.text.disabled}
                languageName={props.languageName}
                text={props.text.name}
                noFloat={true}
            />
            <StyledAutoComplete>
                <AutoComplete
                    name={getItemTranslate(props.languageName, props.text.name)}
                    getItems={getData}
                    onComponentSettingChange={props.onComponentSettingChange}
                    data={data}
                    settings={props.settings}
                    selectedData={selectedData}
                    setSelectedData={{
                        roles: SetSelectedDataFromRolesData,
                        channels: SetSelectedDataFromChannelsData,
                    }}
                    type={props.type}
                />
            </StyledAutoComplete>
        </StyledSetting>
    );
};

const hasCorrectData = (data: object): boolean => 'roles' in data || 'channels' in data;

const convertPreciseDataToAutoCompleteData = (data: IChannelsData[] | IRolesData[]): IAutoCompleteData[] => {
    return data.map(data => {
        return {
            id: data.id,
            name: data.name,
        };
    });
};

const mapStateToProps = (state: MapStateToProps) => {
    return {
        roles: state.server.roles,
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
        getServerRolesStart: (serverId: string) => dispatch(getServerRolesStart(serverId)),
        getServerChannelsStart: (serverId: string) => dispatch(getServerChannelsStart(serverId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteWithSwitch);

import { getItemTranslate } from '@cylbot/cyldiscordbotlanguage/index';
import { QuestionMark } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Switch from '../../../../../../../../../components/forms/Switch/Switch';
import Paragraph from '../../../../../../../../../components/text/Paragraph/Paragraph';
import { IComponentServerSettings, IRolesData } from '../../../../../../../../../interfaces/api/Component';
import { IDetailedServer } from '../../../../../../../../../interfaces/api/Server';
import CapitalizeFirstLetter from '../../../../../../../../../services/stringManipulation/CapitalizeFirstLetter';
import { MapStateToProps } from '../../../../../../../../../store';
import { ServerStoreState } from '../../../../../../../../../store/server';
import { getServerRolesStart } from '../../../../../../../../../store/server/Action';
import RoleSettingAutoComplete from './RoleSettingAutoComplete';


const StyledSetting = styled.div`
`;

const StyledAutoComplete = styled.div`
`;

const StyledSwitch = styled.div`
    text-align: right;
    padding: 7px 0;
`;


type RoleSettingsProps = {
    settings: IComponentServerSettings;
    detailedServer: IDetailedServer;
    onComponentSettingChange: (data: IComponentServerSettings) => void;
    isModalOpen: boolean;
};

type DispatchProps = {
    getServerRolesStart: (serverId: string) => void,
};

type Props = RoleSettingsProps & DispatchProps & ServerStoreState;

const RoleSetting: React.FC<Props> = (props: Props) => {
    if (!hasCorrectData(props.settings.data)) {
        throw new Error('data for role settings is incorrect!');
    }

    const [selectedRoles, setSelectedRoles] = useState<IRolesData[]>([]);
    const params = useParams();

    useEffect(() => {
        if (props.isModalOpen) {
            getRoles();
        }
    }, [props.isModalOpen]);

    useEffect(() => {
        if ('roles' in props.settings.data) {
            setSelectedRoles(props.settings.data.roles);
        }
    }, [props.settings.data]);

    useEffect(() => {
        if (selectedRoles && props.roles) {
            const newRoles = checkIfRoleNameAsBeenChanged(props.roles, selectedRoles);
            if (newRoles) {
                props.onComponentSettingChange(
                    {
                        ...props.settings,
                        ...{data: editRoleData(props.settings.data, newRoles)},
                    },
                );
            }
        }
    }, [selectedRoles, props.roles]);


    const getRoles = (): void => {
        if (params.serverId) {
            props.getServerRolesStart(params.serverId);
        }
    };

    const languageName = props.detailedServer.language.small_name;
    const rolesName = getItemTranslate(languageName, 'ROLES');
    const rolesSwitchDescription = getItemTranslate(languageName, 'SETTINGS_ROLES_TITLE');
    const rolesSwitchDetailedDescription = getItemTranslate(languageName, 'SETTINGS_ROLES_DESCRIPTION');
    const enabledName = CapitalizeFirstLetter(getItemTranslate(languageName, 'ENABLED'));
    const disabledName = CapitalizeFirstLetter(getItemTranslate(languageName, 'DISABLED'));


    return (
        <StyledSetting>
            <Paragraph size={'small'}
                css={'float: left; '}
            >{rolesSwitchDescription}</Paragraph>
            <Tooltip title={rolesSwitchDetailedDescription}>
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
                {props.settings.turned_on ? enabledName : disabledName} {rolesName}:
            </Paragraph>
            <StyledAutoComplete>
                <RoleSettingAutoComplete
                    name={rolesName}
                    getItems={getRoles}
                    onComponentSettingChange={props.onComponentSettingChange}
                    roles={props.roles}
                    settings={props.settings}
                    selectedRoles={selectedRoles}
                    setSelectedRoles={setSelectedRoles}
                />
            </StyledAutoComplete>
        </StyledSetting>
    );
};

const hasCorrectData = (data: object): boolean => 'roles' in data;


const editRoleData = (data: object, roles: IRolesData[]): object => {
    data = {
        ...data,
        roles: roles,
    };

    return data;
};

interface FoundRoleWithId {
    role?: IRolesData;
    index?: number;
}

const checkIfRoleNameAsBeenChanged = (availableRoles: IRolesData[], selectedRoles: IRolesData[]): IRolesData[] | false => {
    const updatedRoles = selectedRoles;
    let roleHaveUpdated = false;

    selectedRoles.forEach((selectedRole, selectedRoleIndex) => {
        let foundRole = false;
        availableRoles.forEach(availableRole => {
            if (selectedRole.name === availableRole.name) {
                foundRole = true;
            }
        });
        if (!foundRole) {
            let foundRoleWithId: FoundRoleWithId = {};
            availableRoles.forEach((availableRole, availableRoleIndex) => {
                if (selectedRole.id === availableRole.id) {
                    foundRoleWithId = {
                        role: availableRole,
                        index: availableRoleIndex,
                    };
                }
            });

            if (foundRoleWithId.role && foundRoleWithId.index) {
                updatedRoles[selectedRoleIndex].name = foundRoleWithId.role.name;
            } else {
                updatedRoles.splice(1, selectedRoleIndex);
            }

            roleHaveUpdated = true;
        }
    });

    if (!roleHaveUpdated) {
        return false;
    } else {
        return updatedRoles;
    }
};

const mapStateToProps = (state: MapStateToProps) => {
    return {
        roles: state.server.roles,
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleSetting);

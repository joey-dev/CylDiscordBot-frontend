import { getItemTranslate } from '@cylbot/cyldiscordbotlanguage/index';
import { QuestionMark } from '@mui/icons-material';
import { Checkbox, IconButton, Tooltip } from '@mui/material';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Loader from '../../../../../../../../../../../components/layout/Loader/Loader';
import Paragraph from '../../../../../../../../../../../components/text/Paragraph/Paragraph';
import { IComponentServerSettings, ITypeData } from '../../../../../../../../../../../interfaces/api/Component';
import { IDetailedServer } from '../../../../../../../../../../../interfaces/api/Server';


const StyledCheckboxes = styled.div`
    text-align: left;
    padding: 30px 0;
`;

type Props = {
    settings: IComponentServerSettings;
    detailedServer: IDetailedServer;
    onComponentSettingChange: (data: IComponentServerSettings) => void;
    isModalOpen: boolean;
};

const TypeSetting: React.FC<Props> = (props: Props) => {
    if (!hasCorrectData(props.settings.data)) {
        throw new Error('data for channel settings is incorrect!');
    }

    const [data, setData] = React.useState<ITypeData>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, type: keyof ITypeData) => {
        if (!data) {
            return;
        }
        const updatedData = {
            ...data,
            [type]: event.target.checked || false,
        };

        props.onComponentSettingChange(
            {...props.settings, data: updatedData},
        );
    };

    useEffect(() => {
        setData(props.settings.data as ITypeData);
    }, [props.settings.data]);

    //TODO: change names
    const languageName = props.detailedServer.language.small_name;
    const typeSettingDescription = getItemTranslate(languageName, 'SETTINGS_TYPES_TITLE');
    const typeSettingDetailedDescription = getItemTranslate(languageName, 'SETTINGS_TYPES_DESCRIPTION');

    if (!data) {
        return (
            <Loader />
        );
    }

    return (
        <div>
            <Paragraph size={'small'}
                css={'float: left'}
            >{typeSettingDescription}</Paragraph>
            <Tooltip title={typeSettingDetailedDescription}>
                <IconButton sx={{width: '20px', float: 'left'}}>
                    <QuestionMark sx={{width: '20px'}} />
                </IconButton>
            </Tooltip>
            <br/>
            <StyledCheckboxes>
                prefix:
                <Checkbox name={'prefix'}
                    color={'info'}
                    checked={data.prefix}
                    onChange={(event => handleChange(event, 'prefix'))}
                />
                slash:
                <Checkbox name={'slash'}
                    color={'info'}
                    checked={data.slash}
                    onChange={(event => handleChange(event, 'slash'))}
                />
            </StyledCheckboxes>

        </div>
    );
};
const hasCorrectData = (data: object): boolean => 'prefix' in data && 'slash' in data;


export default TypeSetting;

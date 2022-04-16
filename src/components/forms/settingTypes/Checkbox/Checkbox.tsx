import { ILanguage, ILanguages } from '@cylbot/cyldiscordbotlanguage/index';
import { Checkbox as MuiCheckbox } from '@mui/material';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { IComponentServerSettings, ITypeData } from '../../../../interfaces/api/Component';
import Loader from '../../../layout/Loader/Loader';
import Title from '../util/Title/Title';
import Tooltip from '../util/Tooltip/Tooltip';


const StyledCheckboxes = styled.div`
    text-align: left;
    padding: 30px 0;
`;

type Props = {
    settings: IComponentServerSettings;
    onComponentSettingChange: (data: IComponentServerSettings) => void;
    title: keyof ILanguage;
    tooltip: keyof ILanguage;
    languageName: keyof ILanguages,
};

const Checkbox: React.FC<Props> = (props: Props) => {
    if (!hasCorrectData(props.settings.data)) {
        throw new Error('data for channel settings is incorrect!');
    }

    const data = useMemo(() => {
        return props.settings.data as ITypeData;
    }, [props.settings.data]);

    if (!data) {
        return (
            <Loader />
        );
    }

    return (
        <div>
            <Title title={props.title}
                languageName={props.languageName}
            />
            <Tooltip title={props.tooltip}
                languageName={props.languageName}
            />
            <br />
            <StyledCheckboxes>
                prefix:
                <MuiCheckbox name={'prefix'}
                    color={'info'}
                    checked={data.prefix}
                    onChange={(event => handleChange('prefix', event, data, props.onComponentSettingChange, props.settings))}
                />
                slash:
                <MuiCheckbox name={'slash'}
                    color={'info'}
                    checked={data.slash}
                    onChange={(event => handleChange('slash', event, data, props.onComponentSettingChange, props.settings))}
                />
            </StyledCheckboxes>
        </div>
    );
};
const hasCorrectData = (data: object): boolean => 'prefix' in data && 'slash' in data;

const handleChange = (
    type: keyof ITypeData,
    event: React.ChangeEvent<HTMLInputElement>,
    data: ITypeData,
    onComponentSettingChange: (data: IComponentServerSettings) => void,
    settings: IComponentServerSettings,
) => {
    if (!data) {
        return;
    }
    const updatedData = {
        ...data,
        [type]: event.target.checked || false,
    };

    onComponentSettingChange(
        {...settings, data: updatedData},
    );
};


export default Checkbox;

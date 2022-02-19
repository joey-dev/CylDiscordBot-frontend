import { getItemTranslate, ILanguage } from '@cylbot/cyldiscordbotlanguage/index';
import React from 'react';
import styled from 'styled-components';
import Paragraph from '../../../../../../../components/text/Paragraph/Paragraph';
import { IDetailedServer } from '../../../../../../../interfaces/api/Server';
import CapitalizeFirstLetter from '../../../../../../../services/stringManipulation/CapitalizeFirstLetter';


const StyledBackground = styled.div`
    border-bottom: white 1px solid;
    margin-bottom: 25px;
    padding-bottom: 10px;
    margin-right: 100px;
`;

type Props = {
    pluginName: keyof ILanguage;
    detailedServer: IDetailedServer;
};

const PluginHeader: React.FC<Props> = (props: Props) => {
    const languageName = props.detailedServer.language.small_name;

    return (
        <StyledBackground>
            <Paragraph color="white"
                size={'large'}
                css={'margin: 50px 0 0; padding: 0;'}
            >
                {CapitalizeFirstLetter(getItemTranslate(languageName, props.pluginName))}
            </Paragraph>
        </StyledBackground>
    );
};

export default (PluginHeader);

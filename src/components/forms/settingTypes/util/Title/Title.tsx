import { getItemTranslate, ILanguage, ILanguages } from '@cylbot/cyldiscordbotlanguage/index';
import React from 'react';
import Paragraph from '../../../../text/Paragraph/Paragraph';


type Props = {
    title: keyof ILanguage;
    languageName: keyof ILanguages,
};

const Title: React.FC<Props> = (props: Props) => (
    <Paragraph size={'small'}
        css={'float: left'}
    >
        {getItemTranslate(props.languageName, props.title)}
    </Paragraph>
);


export default Title;

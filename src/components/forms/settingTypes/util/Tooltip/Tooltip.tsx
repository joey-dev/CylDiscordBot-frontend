import { getItemTranslate, ILanguage, ILanguages } from '@cylbot/cyldiscordbotlanguage/index';
import { QuestionMark } from '@mui/icons-material';
import { IconButton, Tooltip as MuiTooltip } from '@mui/material';
import React from 'react';


type Props = {
    title: keyof ILanguage;
    languageName: keyof ILanguages,
};

const Tooltip: React.FC<Props> = (props: Props) => (
    <MuiTooltip title={
        getItemTranslate(props.languageName, props.title)
    }>
        <IconButton sx={{width: '20px', float: 'left'}}>
            <QuestionMark sx={{width: '20px'}} />
        </IconButton>
    </MuiTooltip>
);


export default Tooltip;

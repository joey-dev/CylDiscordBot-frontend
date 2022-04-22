import { ThemeProvider } from '@mui/material';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';

import theme from '../src/util/Theme';


export const parameters = {
    actions: {argTypesRegex: '^on[A-Z].*'},
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    backgrounds: {
        values: [
            {
                name: 'dark',
                value: '#1f2129',
            }
        ]
    },
};

const withThemeProvider = (Story, context) => {
    return (
        <EmotionThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>
                <Story {...context} />
            </ThemeProvider>
        </EmotionThemeProvider>
    );
};

export const decorators = [withThemeProvider];

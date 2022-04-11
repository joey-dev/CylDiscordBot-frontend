import { ComponentStory } from '@storybook/react';
import React from 'react';
import check from '../../../../assets/icons/check.svg';
import { StyledCheckImg } from '../../../../pages/Dashboard/LeftMenu/ServerItems/ServerItems.style';
import ServerLogo from '../../../images/ServerLogo/ServerLogo';
import SelectWithLogoAndIcon from './SelectWithLogoAndIcon';

export default {
    title: 'SelectWithLogoAndIcon',
    component: SelectWithLogoAndIcon,
};


const Template: ComponentStory<typeof SelectWithLogoAndIcon> = (args) => (
    <SelectWithLogoAndIcon default={args.default}
        items={args.items}
        itemClicked={() => {
        }}
    />
);


export const Servers = Template.bind({});

Servers.args = {
    items: [
        {
            key: '0',
            value: {
                icon: <StyledCheckImg src={check} />,
                logo: <ServerLogo server={{
                    id: '0',
                    name: 'some server',
                    owner: true,
                    permissions: '',
                    features: [''],
                    alreadyJoined: true,
                    icon: null,
                }}
                    size={40}
                />,
                text: 'some server',
            },
        },
        {
            key: '1',
            value: {
                icon: <StyledCheckImg src={check} />,
                logo: <ServerLogo server={{
                    id: '1',
                    name: 'some other server',
                    owner: true,
                    permissions: '',
                    features: [''],
                    alreadyJoined: true,
                    icon: null,
                }}
                    size={40}
                />,
                text: 'some other server',
            },
        },
    ],
    default: {
        value: {
            text: 'Please select a server',
        },
    },
};

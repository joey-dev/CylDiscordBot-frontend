import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import check from '../../../assets/icons/check.svg';
import { StyledCheckImg } from '../../../pages/Dashboard/LeftMenu/ServerItems/ServerItem/ServerItem';
import ServerLogo from '../../images/ServerLogo/ServerLogo';
import List, { IListItem } from './List';
import ListItem from './ListItem/ListItem';

export default {
    title: 'List',
    component: List,
    argTypes: {
        numberOfChildren: {
            type: 'number',
            defaultValue: 4,
        },
    },
} as ComponentMeta<typeof List>;

// @ts-ignore
const Template: ComponentStory<typeof Select> = ({numberOfChildren, args}) => {
    // const items: IListItem[] = Array.from({length: numberOfChildren}, (x, i) => i).map(number => {
    //     const numberToString = number.toString();
    //     return {
    //         key: numberToString,
    //         value: {
    //             text: numberToString,
    //             logo: <ServerLogo server={{
    //                 id: numberToString,
    //                 name: numberToString,
    //                 owner: true,
    //                 permissions: "",
    //                 features: [""],
    //                 alreadyJoined: true,
    //                 icon: null,
    //             }}
    //             size={40} />,
    //             icon: <StyledCheckImg src={check} />,
    //         }
    //     } as IListItem;
    // });

    const numberToString = "1";
    const items: IListItem[] = [
        {
            key: numberToString,
            value: {
                text: numberToString,
                logo: <ServerLogo server={{
                    id: numberToString,
                    name: numberToString,
                    owner: true,
                    permissions: "",
                    features: [""],
                    alreadyJoined: true,
                    icon: null,
                }}
                    size={40} />,
                icon: <StyledCheckImg src={check} />,
            }
        }
    ];
    return (
        <List default={items[0]} items={items} itemClicked={() => {}} />
    );
};

export const Primary = Template.bind({});

Primary.args = {};

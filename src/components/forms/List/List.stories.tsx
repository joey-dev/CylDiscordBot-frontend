import { MenuItem } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import ListItem from '../ListItem/ListItem';
import List, { IListItem } from './List';

export default {
    title: 'List',
    component: List,
    argTypes: {
        numberOfChildren: {
            type: 'number',
            defaultValue: 4
        }
    },
} as ComponentMeta<typeof List>;

// @ts-ignore
const Template: ComponentStory<typeof Select> = ({numberOfChildren, args}) => {
    const items: IListItem[] = Array.from({ length: numberOfChildren }, (x, i) => i).map(number => {
        return {
            key: number.toString(),
            value: <ListItem>test item</ListItem>
        }
    })
    return (
        <List {...args} items={items} />
    )
};

export const Primary = Template.bind({});

Primary.args = {
};

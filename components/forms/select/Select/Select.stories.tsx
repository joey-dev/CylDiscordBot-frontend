import { MenuItem } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Select from "./Select";

export default {
	title: "Select",
	component: Select,
	argTypes: {
		numberOfChildren: {
			type: "number",
			defaultValue: 4,
		},
	},
} as ComponentMeta<typeof Select>;

// @ts-ignore
const Template: ComponentStory<typeof Select> = ({numberOfChildren, args}) => (
	<Select {...args} >
		{
			Array.from({length: numberOfChildren}, (x, i) => i).map(number => (
				<MenuItem key={number}
					value={number}
					color={"primary"}
				>{number}</MenuItem>
			))
		}
	</Select>
);

export const Primary = Template.bind({});

Primary.args = {
	value: "value",
	label: "label",
};

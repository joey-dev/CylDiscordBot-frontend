import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Button from "./Button";

export default {
	title: "Button",
	component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) =>
	<Button {...args} />;


export const Primary = Template.bind({});

Primary.args = {
	children: "testing",
	color: "primary",
	variant: "contained",
};

export const Secondary = Template.bind({});

Secondary.args = {
	children: "testing",
	color: "secondary",
	variant: "outlined",
};

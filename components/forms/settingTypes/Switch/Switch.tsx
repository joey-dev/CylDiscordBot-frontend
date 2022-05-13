import { ILanguage, ILanguages } from "@cylbot/cyldiscordbotlanguage/index";
import React from "react";
import styled from "styled-components";
import { IComponentServerSettings } from "../../../../interfaces/api/Component";
import { default as FormSwitch } from "../../Switch/Switch";
import Title from "../util/Title/Title";
import Tooltip from "../util/Tooltip/Tooltip";


const StyledSwitch = styled.div`
    text-align: right;
    padding: 7px 0;
`;

type Props = {
	settings: IComponentServerSettings;
	onComponentSettingChange: (data: IComponentServerSettings) => void;
	title: keyof ILanguage;
	tooltip: keyof ILanguage;
	languageName: keyof ILanguages,
	disabled?: boolean;
};

const Switch: React.FC<Props> = (props: Props) => (
	<div>
		<Title title={props.title}
			languageName={props.languageName}
		/>
		<Tooltip title={props.tooltip}
			languageName={props.languageName}
		/>
		<StyledSwitch>
			<FormSwitch
				onChange={() => (
					props.onComponentSettingChange(
						{...props.settings, ...{turned_on: !props.settings.turned_on}},
					)
				)}
				checked={props.settings.turned_on}
				disabled={props.disabled}
			/>
		</StyledSwitch>
	</div>
);


export default Switch;

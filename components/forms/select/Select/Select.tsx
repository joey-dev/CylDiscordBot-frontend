import { Select as MuiSelect, SelectChangeEvent } from "@mui/material";
import React from "react";


export type SelectProps = {
	value: string;
	label: string;
	children: React.ReactNode;
	onChange: (event: SelectChangeEvent) => void;
};

const Select: React.FC<SelectProps> = (props: SelectProps) => {
	return (
		<MuiSelect
			labelId="demo-simple-select-standard-label"
			id="demo-simple-select-standard"
			value={props.value}
			onChange={props.onChange}
			label={props.label}
			color={"primary"}
		>
			{props.children}
		</MuiSelect>
	);
};

export default (Select);

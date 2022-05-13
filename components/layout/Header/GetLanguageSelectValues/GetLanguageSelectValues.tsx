import { MenuItem } from "@mui/material";
import React from "react";
import { IDisplayLanguage } from "../../../../store/website";
import Icon from "../../../images/Icon/Icon";

const GetLanguageSelectValues = (languages: IDisplayLanguage[]) => {
	return languages.map(language => (
		<MenuItem key={language.key}
			value={language.key}
		>
			<Icon name={language.flag}
				float="left"
				margin="0 5px"
			/>
			{language.name}
		</MenuItem>
	));
};

export default GetLanguageSelectValues;

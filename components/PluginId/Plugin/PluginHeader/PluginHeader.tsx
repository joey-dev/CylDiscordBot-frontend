import { getItemTranslate, ILanguage } from "@cylbot/cyldiscordbotlanguage";
import React from "react";
import { IDetailedServer } from "../../../../interfaces/api/Server";
import CapitalizeFirstLetter from "../../../../services/stringManipulation/CapitalizeFirstLetter";
import Paragraph from "../../../text/Paragraph/Paragraph";
import Style from "../Plugin.style";


type Props = {
	pluginName: keyof ILanguage;
	detailedServer: IDetailedServer;
};

const PluginHeader: React.FC<Props> = (props: Props) => {
	const languageName = props.detailedServer.language.small_name;

	return (
		<Style.Background>
			<Paragraph color="white"
				size={"large"}
				css={"margin: 50px 0 0; padding: 0;"}
			>
				{CapitalizeFirstLetter(getItemTranslate(languageName, props.pluginName))}
			</Paragraph>
		</Style.Background>
	);
};

export default (PluginHeader);

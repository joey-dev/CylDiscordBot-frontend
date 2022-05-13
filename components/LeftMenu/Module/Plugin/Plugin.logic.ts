import { getItemTranslate } from "@cylbot/cyldiscordbotlanguage";
import { useRouter } from "next/router";
import { IFullPluginWithData } from "../../../../interfaces/api/Plugin";
import { IDetailedServer } from "../../../../interfaces/api/Server";
import CapitalizeFirstLetter from "../../../../services/stringManipulation/CapitalizeFirstLetter";


type ReturnValue = {
	title: string;
	navigateToPlugin: () => void;
}

export type ModuleLogicProps = {
	detailedServer: IDetailedServer;
	data: IFullPluginWithData;
	moduleId: number;
}

function ModuleLogic(props: ModuleLogicProps): ReturnValue {
	const languageName = props.detailedServer.language.small_name;
	const title = CapitalizeFirstLetter(getItemTranslate(languageName, props.data.name));

    const router = useRouter();
	const currentServerId = router.query.serverId || "";

	const navigateToPlugin = () =>
		router.push(`/Dashboard?serverId=${currentServerId}&moduleId=${props.moduleId}&pluginId=${props.data.id}`);

	return {
		title,
		navigateToPlugin,
	};
}

export default ModuleLogic;

import { renderHook } from "@testing-library/react-hooks";
import * as ReactRouterDom from "react-router-dom";
import UseDashboardLogic, { DashboardLogicProps } from "./Dashboard.logic";
import dashboardLogicProps from "./Dashboard.static";


const mockedFunction = jest.fn();

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom") as typeof ReactRouterDom,
	useNavigate: () => mockedFunction,
	useParams: jest.fn().mockReturnValue({}),
}));

jest.mock('react-redux', () => ({
	useSelector: jest.fn(),
	useDispatch: () => mockedFunction
}));

describe("In the dashboard: ", () => {
	let parameters: DashboardLogicProps = dashboardLogicProps;

	beforeEach(() => {
		parameters = {...dashboardLogicProps};
	});

	test("Loading is true when Servers are undefined", () => {
		delete parameters.servers;

		const {result} = renderHook(() => UseDashboardLogic(parameters));

		expect(result.current.loading).toBe(true);
	});

	test("Loading is false when Servers are defined", () => {
		const {result} = renderHook(() => UseDashboardLogic(parameters));

		expect(result.current.loading).toBe(false);
	});

	test("onComponentOrPluginSettingsChange runs function editServerDataStart on launch with currentServerId", () => {
		jest.spyOn(ReactRouterDom, "useParams").mockReturnValue({"serverId": "24324"});

		const {result} = renderHook(() => UseDashboardLogic(parameters));

		expect(result.current.data).not.toBeUndefined();

		if (result.current.data) {
			expect(
				result.current.data.onComponentEnabledChange({type: "plugin"}),
			).toBe(true);
		}
	});


	test("onComponentOrPluginSettingsChange runs function editServerDataStart on launch without currentServerId", () => {
		jest.spyOn(ReactRouterDom, "useParams").mockReturnValue({});

		const {result} = renderHook(() => UseDashboardLogic(parameters));

		expect(result.current.data).not.toBeUndefined();

		if (result.current.data) {
			expect(
				result.current.data.onComponentEnabledChange({type: "plugin"}),
			).toBe(false);
		}
	});

});


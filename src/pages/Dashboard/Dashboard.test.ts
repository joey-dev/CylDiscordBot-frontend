import { renderHook } from '@testing-library/react-hooks';
import UseDashboardLogic, { DashboardLogicProps } from './Dashboard.logic';
import * as ReactRouterDom from 'react-router-dom';


const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as typeof ReactRouterDom,
    useNavigate: () => mockedUsedNavigate,
    useParams: jest.fn().mockReturnValue({}),
}));

describe('In the dashboard: ', () => {

    const parameters: DashboardLogicProps = {
        editServerDataStart: (server_id = 'test', data = {type: 'plugin'}) => {
        },
        getServerStart: (server_id = 'serverId') => {
        },
        getServersStart: () => {
        },
        user: {
            id: 1,
            username: 'Emorn Utaz',
            user_id: '214507099093204992',
            token: 'YcbdR5lC4g9wjokiVdCngeTOwKukpP',
        },
        loading: true,
        servers: [
            {
                id: '794988966590808124',
                name: 'Joey\'s bot test',
                icon: null,
                owner: true,
                permissions: '2199023255551',
                features: [],
                alreadyJoined: true,
            },
        ],

    };

    test('Loading is true when Servers are undefined', () => {
        const {result} = renderHook(() => UseDashboardLogic({
            editServerDataStart: parameters.editServerDataStart,
            getServersStart: parameters.getServersStart,
            getServerStart: parameters.getServerStart,
        }));

        expect(result.current.loading).toBe(true);
    });

    test('Loading is false when Servers are defined', () => {
        const {result} = renderHook(() => UseDashboardLogic({
            editServerDataStart: parameters.editServerDataStart,
            servers: parameters.servers,
            getServersStart: parameters.getServersStart,
            getServerStart: parameters.getServerStart,
        }));

        expect(result.current.loading).toBe(false);
    });

    test('onComponentOrPluginSettingsChange runs function editServerDataStart on launch with currentServerId', () => {
        jest.spyOn(ReactRouterDom, 'useParams').mockReturnValue({'serverId': '24324'});

        const {result} = renderHook(() => UseDashboardLogic({
            editServerDataStart: parameters.editServerDataStart,
            getServersStart: parameters.getServersStart,
            getServerStart: parameters.getServerStart,
            servers: parameters.servers,
        }));

        expect(result.current.data).not.toBeUndefined();

        if (result.current.data) {
            expect(
                result.current.data.onComponentEnabledChange({type: 'plugin'}),
            ).toBe(true);
        }
    });


    test('onComponentOrPluginSettingsChange runs function editServerDataStart on launch without currentServerId', () => {
        jest.spyOn(ReactRouterDom, 'useParams').mockReturnValue({});

        const {result} = renderHook(() => UseDashboardLogic({
            editServerDataStart: parameters.editServerDataStart,
            servers: parameters.servers,
            getServersStart: parameters.getServersStart,
            getServerStart: parameters.getServerStart,
        }));

        expect(result.current.data).not.toBeUndefined();

        if (result.current.data) {
            expect(
                result.current.data.onComponentEnabledChange({type: 'plugin'}),
            ).toBe(false);
        }
    });

});


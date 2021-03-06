import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { FETCH_LEAGUE_BEGIN, FETCH_LEAGUE_FAILURE, FETCH_LEAGUE_SUCCESS } from '../../../app/league/constants'
import { fetchLeague } from '../../../store/league/leagueActions'

// Stop axios going off and making requests
const mockedAxios = new MockAdapter(axios);
const mockStore = configureStore([thunk]);

describe('fetch league action', () => {
    const randomId = Math.floor(Math.random() * 10);

    afterEach(() => {
        mockedAxios.reset();
    });

    it('should dispatch a fetch league begin action with id', () => {
        const store = mockStore();
        mockedAxios.onGet().reply(200, {});
        store.dispatch<any>(fetchLeague(randomId));
        expect(store.getActions()[0].type).toEqual(FETCH_LEAGUE_BEGIN);
        expect(store.getActions()[0].payload.id).toEqual(randomId);
    });

    it('should hydrate league on success', () => {
        const store = mockStore({ leagues: [] });
        const exampleName = 'DoD:S 6on6 Winter Regional Cup #1 : Playdown';
        mockedAxios.onGet().reply(200, { name: exampleName });
        store.dispatch<any>(fetchLeague(randomId)).then(
            () => {
                const successAction = store.getActions().find(action => action.type === FETCH_LEAGUE_SUCCESS);
                expect(successAction).toBeTruthy();
                expect(successAction.payload.leagueId).toEqual(randomId);
                expect(successAction.payload.league.name).toEqual(exampleName);
            }
        );
    });

    it('should dispatch a fetch league failure action on rejection', () => {
        const store = mockStore({ leagues: [] });
        mockedAxios.onGet().reply(404);
        store.dispatch<any>(fetchLeague(randomId)).then(
            () => {
                const failureAction = store.getActions().find(action => action.type === FETCH_LEAGUE_FAILURE);
                expect(failureAction).toBeDefined();
                expect(failureAction.payload.error).toBeTruthy();
            }
        );
    })
});

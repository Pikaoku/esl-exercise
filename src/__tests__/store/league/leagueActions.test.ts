import axios from 'axios'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {fetchLeague} from "../../../store/league/leagueActions";
import {
    FETCH_LEAGUE_BEGIN, FETCH_LEAGUE_CONTESTANTS_BEGIN, FETCH_LEAGUE_CONTESTANTS_SUCCESS, FETCH_LEAGUE_FAILURE,
    FETCH_LEAGUE_RESULTS_BEGIN,
    FETCH_LEAGUE_RESULTS_SUCCESS,
    FETCH_LEAGUE_SUCCESS
} from "../../../store/league/leagueTypes";

jest.mock("axios");
const mockStore = configureStore([thunk]);

describe('fetch league action', () => {
    const randomInteger = Math.floor(Math.random() * 10);

    it('should dispatch a fetch league begin action with id', () => {
        const store = mockStore();
        // Stop axios going off and making requests
        axios.get.mockImplementation(() => Promise.resolve({}));
        store.dispatch(fetchLeague(randomInteger));
        expect(store.getActions()[0].type).toEqual(FETCH_LEAGUE_BEGIN);
        expect(store.getActions()[0].payload.id).toEqual(randomInteger);
    });

    it('should hydrate league on success', () => {
        const store = mockStore({leagues: []});
        const exampleName = 'DoD:S 6on6 Winter Regional Cup #1 : Playdown';
        axios.get.mockImplementation(() => Promise.resolve({status: 200, data: {name: exampleName}}));
        return store.dispatch(fetchLeague(randomInteger)).then(
            () => {
                const successAction = store.getActions().find(action => action.type === FETCH_LEAGUE_SUCCESS);
                expect(successAction).toBeTruthy();
                expect(successAction.payload.id).toEqual(randomInteger);
                expect(successAction.payload.data.name).toEqual(exampleName);
            }
        );
    });

    it('should dispatch a fetch league failure action on rejection', () => {
        const store = mockStore({leagues: []});
        const exampleError = 'league id not found';
        axios.get.mockImplementation(() => Promise.reject(exampleError));
        return store.dispatch(fetchLeague(randomInteger)).then(
            () => {
                const failureAction = store.getActions().find(action => action.type === FETCH_LEAGUE_FAILURE);
                expect(failureAction).toBeTruthy();
                expect(failureAction.payload.error).toEqual(exampleError);
                expect(failureAction.payload.id).toEqual(randomInteger);
            }
        );
    });

    it('should hydrate league results and contestants', () => {
        const store = mockStore({leagues: []});
        axios.get.mockImplementation(() => Promise.resolve({status: 200, data: {}}));
        return store.dispatch(fetchLeague(randomInteger)).then(
            () => {
                const actions = store.getActions();
                expect(actions.find(action => action.type === FETCH_LEAGUE_RESULTS_BEGIN)).toBeTruthy();
                expect(actions.find(action => action.type === FETCH_LEAGUE_CONTESTANTS_BEGIN)).toBeTruthy();
                expect(actions.find(action => action.type === FETCH_LEAGUE_RESULTS_SUCCESS)).toBeTruthy();
                expect(actions.find(action => action.type === FETCH_LEAGUE_CONTESTANTS_SUCCESS)).toBeTruthy();
            }
        );
    });

    it('should not attempt hydration if the initial league get fails', () => {
        const store = mockStore({leagues: []});
        axios.get.mockImplementation(() => Promise.reject(''));
        return store.dispatch(fetchLeague(randomInteger)).then(
            () => {
                const actions = store.getActions();
                expect(actions.find(action => action.type === FETCH_LEAGUE_RESULTS_BEGIN)).toBeUndefined();
                expect(actions.find(action => action.type === FETCH_LEAGUE_CONTESTANTS_BEGIN)).toBeUndefined();
                expect(actions.find(action => action.type === FETCH_LEAGUE_RESULTS_SUCCESS)).toBeUndefined();
                expect(actions.find(action => action.type === FETCH_LEAGUE_CONTESTANTS_SUCCESS)).toBeUndefined();
            }
        );
    })
});

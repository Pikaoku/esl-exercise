import {
    defaultLeagueObject,
    FETCH_LEAGUE_BEGIN,
    FETCH_LEAGUE_CONTESTANTS_SUCCESS,
    FETCH_LEAGUE_RESULTS_SUCCESS,
    FETCH_LEAGUE_SUCCESS,
} from '../../../app/leagueResults/constants'
import reducer from '../../../store/reducer'

describe('leagues reducer', () => (
    it('should return default state', () => {
        expect(reducer(undefined, {type: 'test'})).toEqual({
            league: {
                leagues: {}
            }
        })
    })
));

describe('fetch league begin reducer', () => {
    it('leagues should be empty is no fetch requests have been made', () => (
        expect(reducer(undefined, {type: 'test'}).league.leagues).toEqual({})
    ));

    const testFetchLeagueAction = {type: FETCH_LEAGUE_BEGIN, payload: {id: 1}};
    it('should add a league when a request is made', () => (
        expect(reducer(undefined, testFetchLeagueAction).league.leagues[1].id).toEqual('1')
    ));

    it('should set default fetching to true and fetched to false', () => {
        expect(reducer(undefined, testFetchLeagueAction).league.leagues['1'].fetching).toEqual(true);
        expect(reducer(undefined, testFetchLeagueAction).league.leagues['1'].fetched).toEqual(false);
    });

    it('should set default objects for async-retrieved league data', () => {
        expect(reducer(undefined, testFetchLeagueAction).league.leagues['1'].data).toEqual({});
        expect(reducer(undefined, testFetchLeagueAction).league.leagues['1'].contestants).toEqual([]);
        expect(reducer(undefined, testFetchLeagueAction).league.leagues['1'].results).toEqual([]);
        expect(reducer(undefined, testFetchLeagueAction).league.leagues['1'].error).toEqual('');
    });

    it('should not duplicate leagues', () => (
        expect(Object.keys(reducer(undefined, testFetchLeagueAction).league.leagues).length).toEqual(1)
    ));

    const testState = {
        league: {
            leagues: {
                '17701': defaultLeagueObject('17701')
            }
        }
    };
    it('should populate league data on success', () => {
        const exampleData = {id: 17701, type: 'cup', contestantType: 'team', state: 'finished', prizePool: null};
        expect(reducer(
            // establish state as it would be following a FETCH_LEAGUE_BEGIN
            testState,
            // Action to be tested
            {
                payload: {data: exampleData, id: 17701},
                type: FETCH_LEAGUE_SUCCESS
            }
        ).league.leagues['17701'].data).toEqual(exampleData)
    });

    it('should populate results and contestants on successful fetches', () => {
        const exampleResultsData = {id: 12483838, seed: 0, status: 'signedUp', alias: 12483838, name: 'Epic Pwners'};
        expect(reducer(
            testState,
            {
                payload: {data: exampleResultsData, id: 17701},
                type: FETCH_LEAGUE_RESULTS_SUCCESS
            }
        ).league.leagues['17701'].results).toEqual(exampleResultsData);
        const exampleContestantsData = {
            beginAt: '2018-06-29T17:00:00:000Z',
            bracket: 1,
            id: 363663636633,
            round: 1,
            state: 'closed'
        };
        expect(reducer(
            testState,
            {
                payload: {data: exampleContestantsData, id: 17701},
                type: FETCH_LEAGUE_CONTESTANTS_SUCCESS
            }
        ).league.leagues['17701'].contestants).toEqual(exampleContestantsData);
    })
});

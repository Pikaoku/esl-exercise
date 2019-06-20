import {
    FETCH_LEAGUE_BEGIN,
    FETCH_LEAGUE_CONTESTANTS_SUCCESS,
    FETCH_LEAGUE_RESULTS_SUCCESS,
    FETCH_LEAGUE_SUCCESS,
} from '../../../app/league/constants'
import reducer from '../../../store/reducer'

describe('leagues reducer', () => (
    it('should return default state', () => {
        expect(reducer(undefined, { type: 'test' })).toEqual({
            league: {
                leagues: {}
            }
        })
    })
));

describe('fetch league begin reducer', () => {
    it('league should be null if no fetch requests have been made', () => (
        expect(reducer(undefined, { type: 'test' }).league.league).toEqual(null)
    ));

    const testFetchLeagueAction = { type: FETCH_LEAGUE_BEGIN, payload: { leagueId: 1 } };
    it('should add a league when a request is made', () => (
        expect(reducer(undefined, testFetchLeagueAction).league.leagueId).toEqual('1')
    ));

    it('should set default fetching to true and fetched to false', () => {
        expect(reducer(undefined, testFetchLeagueAction).league.fetching).toEqual(true);
        expect(reducer(undefined, testFetchLeagueAction).league.fetched).toEqual(false);
    });

    const testState = { league: { leagueId: 17701 } }

    it('should populate league data on success', () => {
        const exampleData = { id: 17701, type: 'cup', contestantType: 'team', state: 'finished', prizePool: null };
        expect(reducer(
            testState,
            {
                payload: { league: exampleData, leagueId: 17701 },
                type: FETCH_LEAGUE_SUCCESS
            }
        ).league.league.type).toEqual('cup')
    });

    it('should populate results and contestants on successful fetches', () => {
        const exampleResultsData = { id: 12483838, seed: 0, status: 'signedUp', alias: 12483838, name: 'Epic Pwners' };
        expect(reducer(
            testState,
            {
                payload: { LeagueResult: exampleResultsData, leagueId: 17701 },
                type: FETCH_LEAGUE_RESULTS_SUCCESS
            }
        ).league.leagueResults.id).toEqual(12483838);
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
                payload: { leagueContestant: exampleContestantsData, leagueId: 17701 },
                type: FETCH_LEAGUE_CONTESTANTS_SUCCESS
            }
        ).league.leagueContestant.id).toEqual(363663636633);
    })
});

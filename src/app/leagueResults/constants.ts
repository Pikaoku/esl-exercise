export const FETCH_LEAGUE_BEGIN = 'fetch league begin';
export const FETCH_LEAGUE_RESULTS_BEGIN = 'fetch league results begin';
export const FETCH_LEAGUE_CONTESTANTS_BEGIN = 'fetch league contestants begin';
export const FETCH_LEAGUE_SUCCESS = 'fetch league success';
export const FETCH_LEAGUE_RESULTS_SUCCESS = 'fetch league results success';
export const FETCH_LEAGUE_CONTESTANTS_SUCCESS = 'fetch league contestants success';
export const FETCH_LEAGUE_FAILURE = 'fetch league failure';
export const FETCH_LEAGUE_RESULTS_FAILURE = 'fetch league results failure';
export const FETCH_LEAGUE_CONTESTANTS_FAILURE = 'fetch league contestants failure';

export const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
export const ESL_API_BASE = CORS_PROXY + 'https://api.eslgaming.com/play/v1/';
export const ESL_API_LEAGUES = ESL_API_BASE + 'leagues/';
export const ESL_API_LEAGUES_RESULTS = '/results';
export const ESL_API_LEAGUES_CONTESTANTS = '/contestants';
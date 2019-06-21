class LeagueContestantEntity {
    constructor(
        public id: number,
        public seed: number,
        public status: string,
        public alias: string,
        public name: string,
        public region: string | null
    ) { }
}

export default LeagueContestantEntity
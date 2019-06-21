export class LeagueResultParticipant {
    constructor(
        public id: number,
        public place: number,
        public points: number[]
    ) { }
}

class LeagueResultEntity {
    constructor(
        public id: number,
        public state: string,
        public bracket: number,
        public beginAt: string,
        public position: number,
        public round: number,
        public participants: LeagueResultParticipant[]
    ) { }
}

export default LeagueResultEntity
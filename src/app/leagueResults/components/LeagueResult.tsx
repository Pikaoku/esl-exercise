import * as React from "react";

interface LeagueResultProps {
    result: object
}

const LeagueResult: React.StatelessComponent<LeagueResultProps> =
    ({result}: LeagueResultProps) => (
        <div>
            Hello there
        </div>
    );

export default LeagueResult

import * as React from 'react';
import Helmet from "react-helmet";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import LeagueResults from "./leagueResults/LeagueResults";

export class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <Helmet>
                    <link rel="shortcut icon"
                          href="https://www.eslgaming.com/sites/all/themes/stability/stability_sub/favicon.ico"
                          type="image/vnd.microsoft.icon"/>
                    <title>Coding Exercise | ESL Gaming</title>
                </Helmet>
                <BrowserRouter>
                    <Switch>
                        <Route exact={true} path={'/'} component={LeagueResults}/>
                        {/* robots.txt, sitemap etc etc */}
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;

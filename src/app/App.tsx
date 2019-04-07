import * as React from 'react';
import Helmet from "react-helmet";
import './App.css';

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <Helmet>
                    <link rel="shortcut icon"
                          href="https://www.eslgaming.com/sites/all/themes/stability/stability_sub/favicon.ico"
                          type="image/vnd.microsoft.icon"/>
                    <title>Coding Exercise | ESL Gaming</title>
                </Helmet>
                <header className="App-header">
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.tsx</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;

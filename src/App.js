import './App.css';
import {
  Switch, Route, Link
} from "react-router-dom";

import Echo from "./components/Echo"

function App() {
  return (
    <div className="App">
      <Switch>

        <Route path="/test/hello">
					<Echo message="Hello World"/>
        </Route>

        <Route path="/">
          <h1>Home</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

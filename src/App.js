import './App.css';
import {
  Switch, Route, Link
} from "react-router-dom";

import Test from "./components/Test"

function App() {
  return (
    <div className="App">
      <Switch>

        <Route path="/test/hello">
					<Test />
        </Route>

        <Route path="/">
          <h1>Home</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

import { Route, Switch } from 'wouter'
import './App.css'
import Home from './routes/Home'
import Explore from './routes/Explore'
import Trainsition from './components/Transition'


function App() {
  return (
    <Switch>
      <Route path={"/"}>
        <Home />
      </Route>
      <Route path={"/explore"}>
        <Explore />
      </Route>
      <Route path={"/transition"}>
        <Trainsition opacity={1} />
      </Route>
    </Switch>
  )
}

export default App

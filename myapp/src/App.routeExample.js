import React from 'react';

import { Switch, Route, Link } from 'react-router-dom';
import key from "weak-key";

const players = [
 { name: 'first', number: '001', position: '1' },
 { name: 'second', number: '002', position: '2' },
 { name: 'third', number: '003', position: '3' }
];

const Player = (props) => {
  const player = {
    name: players[parseInt(props.match.params.number, 10)-1].name,
    number: players[parseInt(props.match.params.number, 10)-1].number,
    position: players[parseInt(props.match.params.number, 10)-1].position
  };
  if (!player) {
    return <div>Sorry, but the player was not found</div>
  }
  return (
    <div>
      <h1>{player.name} (#{player.number})</h1>
      <h2>{player.position}</h2>
    </div>
  );
}

const players_obj = players ? players.map((player) =>
  <li key={key(player)}>
    <Link to={`/roster/${player.number}`}>{player.name}</Link>
  </li>
) : [] ;

const FullRoster = () => (
  <div>
      { players_obj }
  </div>
)

const Schedule = () => (
  <div>
    <ul>
      <li>6/5 @ Спартак</li>
      <li>6/8 vs Зенит</li>
      <li>6/14 @ Рубин</li>
    </ul>
  </div>
)
const Home = () => (
  <div>
    <h1>Добро пожаловать на наш сайт!</h1>
  </div>
)

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/roster'>Roster</Link></li>
        <li><Link to='/schedule'>Schedule</Link></li>
      </ul>
    </nav>
  </header>
)

const Roster = () => (
  <div>
    <h2>This is a roster page!</h2>
    <Switch>
      <Route exact path='/roster' component={FullRoster}/>
      <Route path='/roster/:number' component={Player}/>
    </Switch>
  </div>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/roster' component={Roster}/>
      <Route path='/schedule' component={Schedule}/>
    </Switch>
  </main>
)

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)

export default App;

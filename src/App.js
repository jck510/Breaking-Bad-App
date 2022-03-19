import './App.css';
import HomePage from './components/HomePage';
import CharactersPage from './components/CharactersPage';
import { Routes, Route } from 'react-router-dom';
import EpisodeDetailsPage from './components/EpisodeDetailsPage';
import QuotesPage from './components/QuotesPage';
import DeathsPage from './components/DeathsPage';
import CharacterDetailsPage from './components/CharacterDetailsPage';

function App() {
  

  return (
    <div className="App">

      {/* Routing */}
      <Routes>
      <Route exact path='/' element={<HomePage />}/>
      <Route exact path='/characters' element={<CharactersPage/>}/>
      <Route exact path='/episode-details' element={<EpisodeDetailsPage />}/>
      <Route exact path='/quotes' element={<QuotesPage />}/>
      <Route exact path='/deaths' element={<DeathsPage />}/>
      <Route exact path='/characters/:name' element={<CharacterDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;

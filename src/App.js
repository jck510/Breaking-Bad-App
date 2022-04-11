import './App.css';
import HomePage from './components/HomePage';
import CharactersPage from './components/CharactersPage';
import { Routes, Route } from 'react-router-dom';
import EpisodeDetailsPage from './components/EpisodeDetailsPage';
import QuotesPage from './components/QuotesPage';
import DeathsPage from './components/DeathsPage';
import CharacterDetailsPage from './components/CharacterDetailsPage';
import BreakingBadDetailsPage from './components/BreakingBadDetailsPage';
import BetterCallSaulDetailsPage from './components/BetterCallSaulDetailsPage';
import EpisodePage from './components/EpisodePage';

function App() {
  

  return (
    <div className="App">

      {/* Routing */}
      <Routes>
      <Route exact path='/' element={<HomePage />}/>
      <Route exact path='/characters' element={<CharactersPage/>}/>
      <Route exact path='/characters/:name' element={<CharacterDetailsPage />} />
      <Route exact path='/episode-details' element={<EpisodeDetailsPage />}/>
      <Route exact path='/episode-details/breaking-bad' element={<BreakingBadDetailsPage />}/>
      <Route exact path='/episode-details/breaking-bad/season/:seasonNumber' element={<BreakingBadDetailsPage />}/>
      <Route exact path='/episode-details/id/:episodeId' element={<EpisodePage />}/>
      <Route exact path='/episode-details/better-call-saul' element={<BetterCallSaulDetailsPage />}/>
      <Route exact path='/episode-details/better-call-saul/season/:seasonNumber' element={<BetterCallSaulDetailsPage />}/>
      <Route exact path='/episode-details/id/:episodeId' element={<EpisodePage />}/>
      <Route exact path='/quotes' element={<QuotesPage />}/>
      <Route exact path='/quotes/:name' element={<QuotesPage />}/>
      <Route exact path='/deaths' element={<DeathsPage />}/>

      

      </Routes>
    </div>
  );
}

export default App;

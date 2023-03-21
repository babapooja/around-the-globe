import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import CountryDetail from './pages/CountryDetail';
import Home from './pages/Home';

function App() {
  return (
    <main className='bg-slate-50'>
      <Routes>
        <Route exact path="/" element={<Header/>}>
          <Route index element={<Home/>}/>
          <Route path="/:code" element={<CountryDetail/>}/>
        </Route>
      </Routes>
    </main>
  );
}

export default App;

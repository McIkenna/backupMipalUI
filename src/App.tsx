import React, {useEffect} from 'react';
import { Container, Box } from '@mui/material';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Home } from './component/Home';
import { AnalyticPage } from './component/AnalyticPage';
import { TablePage } from './component/TablePage';
import './App.css';

function App() {

  return (
    <Router>
    <div className="App">
      <Box sx={{ padding: '10%', }}>
      <Home>
      <Routes>
     
      <Route path='/analytics' Component={AnalyticPage} />
      <Route path='/tablepage' Component={TablePage} />
          
      </Routes>
      </Home>  
      </Box>
    </div>
    </Router>
  );
}

export default App;

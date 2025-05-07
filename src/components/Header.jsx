import React from 'react';
import './Header.css';
import { Movie } from '@mui/icons-material';


const Header = () => (
  <header className="App-header">
    <h1><Movie sx={{ fontSize: 40 }} /> Flixster</h1>
  </header>
);

export default Header;

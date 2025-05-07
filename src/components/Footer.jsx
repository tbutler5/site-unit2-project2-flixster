import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="App-footer">
    <p>&copy; {new Date().getFullYear()} Flixster • Built with TMDb API</p>
  </footer>
);

export default Footer;

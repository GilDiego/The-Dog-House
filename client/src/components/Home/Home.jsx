import './Home.css';
import React from 'react';
import Header from '../Header/Header.jsx';
import Cards from '../Cards/Cards.jsx';
import Buttons from '../Buttons/Buttons.jsx';
export default function Home() {
  return (
    <>
      <Header />
      <Buttons />
      <Cards />
    </>
  );
}

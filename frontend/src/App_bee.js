import React from 'react'
import Destinations from './components/destinations/Destinations'
import Footer from './components/footer/Footer';
import Hero from './components/hero/Hero'
import Navbar from './components/navbar/Navbar'
import Selects from './components/selects/Selects';

function App_bee() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Destinations />
      <Selects />
      <Footer />
    </div>
  );
}

export default App_bee;

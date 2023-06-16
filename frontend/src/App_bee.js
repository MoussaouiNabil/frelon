import React from 'react'
import Difference from './components/difference/Difference'
import Footer from './components/footer/Footer';
import Bee from './components/bee/Bee'
import Navbar from './components/navbar/Navbar'
import Selects from './components/selects/Selects';

function App_bee() {
  return (
    <div>
      <Navbar />
      <Bee />
      <Difference />
      <Selects />
      <Footer />
    </div>
  );
}

export default App_bee;

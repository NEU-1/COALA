import RootNavigationContainer from '../routes/containers/RootNavigationContainer';
import React from 'react';
import Footer from './Common/Footer';
import Header from './Common/Header';

function App() {
  return (
      <div>
        <Header />
        <RootNavigationContainer/>
        <Footer />
      </div>

    
    
  );
}

export default App;

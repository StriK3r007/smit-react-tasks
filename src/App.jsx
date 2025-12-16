// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Home from './pages/Home'
// import Head from './components/Head'; // Header component
// import Turo from './pages/Turo'; // The page for the "Turo" project

// const App = () => {
//   return (
//     <Router>
//       <Head /> {/* This will render the header/navigation for every page */}
//       <Switch>
//         <Route exact path="/" component={Home} /> {/* Default route or home page */}
//         <Route path="/turo-clone" component={Turo} /> {/* The Turo project */}
//         {/* Add other routes for more projects */}
//       </Switch>
//     </Router>
//   );
// };

// export default App;


// App.jsx (Corrected for React Router v6)
import React from 'react';
// BrowserRouter is fine, but you don't need 'as Router' alias.
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';

// Assignments
import Turo from './pages/Turo';
import DaisyUi from './pages/DaisyUi';
import CounterApp from './pages/CounterApp'
import BootstrapUi from './pages/BootstrapUi';
import PageNotFound from './components/PageNotFound'
import OlxCards from './pages/OlxCards';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop/>
      <Routes>
        <Route
          exact
          path="/"
          element={<Home />}
        />
        <Route
          exact
          path="*"
          element={<PageNotFound />}
        />
        <Route
          path="/turo-clone"
          element={<Turo />}
        />
        <Route
          path='/daisy-ui'
          element={<DaisyUi/>}
        />
        <Route 
          path='/counter-app'
          element={<CounterApp/>}
        />
        <Route 
          path='/react-bootstrap'
          element={<BootstrapUi/>}
        />
        <Route
          path='/olx-cards'
          element={<OlxCards />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
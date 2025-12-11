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

// Assignments
import Turo from './pages/Turo';
import DaisyUi from './pages/DaisyUi';
import CounterApp from './pages/CounterApp'

const App = () => {
  return (
    <BrowserRouter> {/* Renamed from <Router> */}
      <Header /> {/* This is correctly outside the Routes block */}
      <Routes> {/* **CRITICAL FIX:** Replaced <Switch> with <Routes> */}
        <Route
          exact
          path="/"
          element={<Home />}
        /> {/* **CRITICAL FIX:** Replaced component={Home} with element={<Home />} */}
        <Route
          path="/turo-clone"
          element={<Turo />}
        /> {/* **CRITICAL FIX:** Replaced component={Turo} with element={<Turo />} */}
        <Route
          path='/daisy-ui'
          element={<DaisyUi/>}
        />
        <Route 
          path='/counter-app'
          element={<CounterApp/>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
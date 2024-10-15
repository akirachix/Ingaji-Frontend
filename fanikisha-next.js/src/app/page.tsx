"use client"

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CooperativeDashboard from "./(sacco)/sacco/cooperativeFarmers/page";
import CooperativeDetail from "./(sacco)/sacco/cooperativeDetail/page";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CooperativeDashboard />} />
        <Route path="/cooperative/:id" element={<CooperativeDetail/>} />
      </Routes>
    </Router>
  );
};

export default App;


// import React from "react";
// import CooperativeDashboard from "./(sacco)/sacco/cooperativeFarmers/page";

// const Home: React.FC = () => {
//   return <CooperativeDashboard />;
// };

// export default Home;

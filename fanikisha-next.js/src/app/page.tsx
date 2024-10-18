import React from "react";

import Landing from "./landing/page";

export default function RootLayout() {
  return (
    <div>
      <Landing />



    </div>
  );
}
// "use client"
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import CooperativeDashboard from "./(sacco)/sacco/cooperativeFarmers/page";
// import CooperativeDetail from "./(sacco)/sacco/cooperativeDetail/page";

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<CooperativeDashboard />} />
//         <Route path="/cooperative/:id" element={<CooperativeDetail />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

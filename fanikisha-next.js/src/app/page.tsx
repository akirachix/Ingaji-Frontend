import React from "react";

import Landing from "./landing/page";
import Sidebar from "./(sacco)/sacco/components/Sidebar";

export default function RootLayout() {
  return (
    <div>
      <Landing />

<Sidebar/>

    </div>
  );
}

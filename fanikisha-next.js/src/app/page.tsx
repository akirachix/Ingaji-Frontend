import React from "react";
import FarmersDashboard from "./farmers-accounts/page";
import Layout from './components/Layout';
import Overview from './components/Overview';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <Layout>
        <div className="flex">
          <main className="flex-1">{children}</main>
          <FarmersDashboard /> 
          <Overview/>
        </div>
        </Layout>

  );
}
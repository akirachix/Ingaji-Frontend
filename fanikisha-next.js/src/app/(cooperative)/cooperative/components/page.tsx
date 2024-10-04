import Layout from "./Layout";
import Sidebar from "./Sidebar";

export default function RootLayout() {
    return (
        <Layout>
          <div className="flex">
            <Sidebar/>
          </div>
          </Layout>
    );
  }
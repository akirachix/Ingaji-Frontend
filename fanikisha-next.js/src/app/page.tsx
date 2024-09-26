import { defined } from 'chart.js/helpers';
import Layout from './components/Layout';
// import Sidebar from './components/Sidebar';
// import ChangePassword from './components/ChangePassword';
import Overview from './components/Overview';
// import MilkRecords from './components/MilkRecords';
// import LoadingPage from './components/LoadingPage';
// import Accounts from './components/Accounts';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <Layout>
        <div className="flex">
          <main className="flex-1">{children}</main>
          {/* <MilkRecords/> */}
          <Overview/>
          {/* <Accounts/> */}
          {/* <LoadingPage isLoading={defined}/> */}
          {/* <ChangePassword/> */}


        </div>
        </Layout>
      
  );
}



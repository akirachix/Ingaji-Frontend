// import Sidebar from './(cooperative)/cooperative/components/Sidebar';
// import Layout from './(cooperative)/cooperative/components/Layout';

import Sidebar from './(sacco)/sacco/components/Sidebar';
import Layout from './(sacco)/sacco/components/Layout';

// import Sidebar from './(admin)/admin/components/Sidebar';
// import Layout from './(admin)/admin/components/Layout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <Layout>
        <div className="flex">
          <main className="flex-1">{children}</main>
          {/* <Sidebar/> */}
        </div>
        </Layout>
  );
}
import Sidebar from "./(admin)/admin/components/Sidebar";
import Layout from "./layout";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <Layout>
        <div className="flex">
          <main className="flex-1">{children}</main>
          <Sidebar/>
        </div>
        </Layout>
  );
}
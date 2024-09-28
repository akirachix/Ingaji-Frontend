// import Layout from './(sacco)/sacco/components/Layout';
// import MilkRecords from './(sacco)/sacco/milk-record/page';

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//       <Layout>
//         <div className="flex">
//           {/* <main className="flex-1">{children}</main> */}
//           {/* <Overview/> */}
//           {/* <MilkRecords/> */}
//         </div>
//         </Layout>

//   );
// }

import MilkRecords from "./(sacco)/sacco/milk-record/page";

export default function Home(){
  return (
    <div>
      <MilkRecords/>
    </div>
  )

}

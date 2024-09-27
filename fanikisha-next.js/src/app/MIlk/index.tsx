
// 'use client';
// import React, { useState } from 'react';
// import { useMilkRecords } from '../hooks/milkRecords';
// import { ChevronLeft, Plus, ChevronRight, ChevronLeft as ChevronLeftIcon, Edit } from 'lucide-react';
// import Layout from '../(sacco)/sacco/components/Layout';

// const MilkRecordsTable = () => {
//   const { milkRecords, setMilkRecords, loading, error } = useMilkRecords(); 
//   const [editingRecord, setEditingRecord] = useState(null);
//   const [isAddingRecord, setIsAddingRecord] = useState(false);
//   const [newRecord, setNewRecord] = useState({ date: '', milk_quantity: '', price: '' });

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   const handleEdit = (record) => {
//     setEditingRecord({ ...record });
//   };

//   const handleSave = () => {
//     if (editingRecord) {
//       setMilkRecords(prevRecords => 
//         prevRecords.map(record => (record.id === editingRecord.id ? editingRecord : record))
//       );
//     }
//     setEditingRecord(null);
//   };

//   const handleChange = (e, recordSetter) => {
//     recordSetter(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleAdd = () => {
//     setMilkRecords(prevRecords => [...prevRecords, { ...newRecord, id: Date.now() }]);
//     setIsAddingRecord(false);
//     setNewRecord({ date: '', milk_quantity: '', price: '' });
//   };

//   const RecordForm = ({ record, onSave, onCancel, title }) => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
//       <div className="bg-white p-8 w-[900px] h-[940px] border rounded-lg shadow-lg ml-96">
//         <h3 className="text-2xl font-semibold mb-20 text-center text-blue-500 mt-20">{title}</h3>
//         <input 
//           type="date" 
//           name="date" 
//           value={record.date} 
//           onChange={(e) => handleChange(e, onSave === handleAdd ? setNewRecord : setEditingRecord)}
//           className="w-[700px] mb-20 p-2 border-4 rounded border-blue-500 ml-20 text-2xl"
//         />
//         <input 
//           type="number" 
//           name="milk_quantity" 
//           value={record.milk_quantity} 
//           onChange={(e) => handleChange(e, onSave === handleAdd ? setNewRecord : setEditingRecord)}
//           placeholder="Quantity (L)"
//           className="w-[700px] mb-20 p-2 border-4 rounded border-blue-500 ml-20 text-2xl"
//         />
//         <input 
//           type="number" 
//           name="price" 
//           value={record.price} 
//           onChange={(e) => handleChange(e, onSave === handleAdd ? setNewRecord : setEditingRecord)}
//           placeholder="Sale (Litre)"
//           className="w-[700px] mb-20 p-2 border-4 rounded border-blue-500 ml-20 text-2xl"
//         />
      
//         <div className="flex gap-32 ml-52 mt-44">
//           <button onClick={onCancel} className="px-8 py-4 bg-white rounded-md text-2xl font-bold border border-blue-500">Cancel</button>
//           <button onClick={onSave} className="px-10 py-4 bg-blue-500 text-white rounded-md text-2xl font-bold">Save</button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <Layout>
//     <div className="max-w-6xl mx-auto p-4 mt-28 ">
//       <div className="flex justify-between mb-20 ">
//         <button className="text-blue-500"><ChevronLeft size={24} /></button>
//         <button 
//           onClick={() => setIsAddingRecord(true)} 
//           className="bg-blue-400 text-white px-4 py-2 rounded-full flex"
//         >
//           <Plus size={20} className="mr-2" /> Add Collection
//         </button>
//       </div>
      
//       <div className="bg-white p-16 rounded-lg shadow-[0_2px_4px_0px_rgba(64,123,255)] mb-14 flex gap-8 pb-8 border w-[900px] h-[150px] ml-52">
//         <p className="text-xl text-black font-bold">Cooperative No: Muguga Dairy</p>
//         <p className="text-xl text-black font-bold">Phone No: 0716626362</p>
//         <p className="text-xl text-black font-bold">Joined: Oct. 2016</p>
//       </div>
//       <table className="w-[1290px] ml-2">
//         <thead>
//           <tr className="text-left text-blue-500 border-b-8 border-blue-400 text-2xl">
//             <th className="pb-2">First name</th>
//             <th className="pb-2">last name</th>
//             <th className='pb-2'>Milk quantity(L)</th>
//             <th className="pb-2">Price</th>
//             <th className="pb-2">Total value</th>
           
//           </tr>
//         </thead>
//         <tbody>
//           {milkRecords.map((record, index) => (
//             <tr key={index} className="bg-white mb-2 border-b border-gray-300 text-2xl">
//               <td className="p-3">{new Date(record.date).toLocaleDateString()}</td>
//               <td className="p-3">{record.milk_quantity}</td>
//               <td className="p-3">{record.price}</td>
//               <td className="p-3">
//                 <button onClick={() => handleEdit(record)} className="text-gray-500">
//                   <Edit size={18} />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="flex mt-20">
//         <button className="mx-1 px-3 py-1 border rounded text-blue-400 ml-96"><ChevronLeftIcon size={20} /></button>
//         {[1, 2, 3, 4, 5].map((page) => (
//           <button 
//             key={page} 
//             className={`mx-1 px-3 py-1 border rounded ${page === 1 ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
//           >
//             {page}
//           </button>
//         ))}
//         <button className="mx-1 px-3 py-1 border rounded text-blue-500"><ChevronRight size={20} /></button>
//       </div>

//       {editingRecord && (
//         <RecordForm 
//           record={editingRecord} 
//           onSave={handleSave} 
//           onCancel={() => setEditingRecord(null)} 
//           title="Edit Record" 
//         />
//       )}

//       {isAddingRecord && (
//         <RecordForm 
//           record={newRecord} 
//           onSave={handleAdd} 
//           onCancel={() => setIsAddingRecord(false)} 
//           title="Add New Collection" 
//         />
//       )}
//     </div>
//     </Layout>
//   );
// };

// export default MilkRecordsTable;

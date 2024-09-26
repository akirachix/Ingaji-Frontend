
'use client';
import React, { useState } from 'react';
import { useMilkRecords } from '../hooks/milkRecords';
import { ChevronLeft, Plus, ChevronRight, ChevronLeft as ChevronLeftIcon,Edit} from 'lucide-react';

const MilkRecordsTable = () => {
  const { milkRecords, loading, error } = useMilkRecords();
  const [editingRecord, setEditingRecord] = useState(null);
  const [isAddingRecord, setIsAddingRecord] = useState(false);
  const [newRecord, setNewRecord] = useState({ date: '', milk_quantity: '', price: '' });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleEdit = (record) => {
    setEditingRecord({ ...record });
  };

  const handleSave = () => {
    console.log('Saving:', editingRecord);
    setEditingRecord(null);
  };

  const handleChange = (e, recordSetter) => {
    recordSetter(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = () => {
    console.log('Adding:', newRecord);
    setIsAddingRecord(false);
    setNewRecord({ date: '', milk_quantity: '', price: '' });
  };

  const RecordForm = ({ record, onSave, onCancel, title }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 w-80">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <input 
          type="date" 
          name="date" 
          value={record.date} 
          onChange={(e) => handleChange(e, onSave === handleAdd ? setNewRecord : setEditingRecord)}
          className="w-full mb-3 p-2 border-b border-black"
        />
        <input 
          type="number" 
          name="milk_quantity" 
          value={record.milk_quantity} 
          onChange={(e) => handleChange(e, onSave === handleAdd ? setNewRecord : setEditingRecord)}
          placeholder="Quantity (L)"
          className="w-full mb-3 p-2 border rounded"
        />
        <input 
          type="number" 
          name="price" 
          value={record.price} 
          onChange={(e) => handleChange(e, onSave === handleAdd ? setNewRecord : setEditingRecord)}
          placeholder="Sale (Litre)"
          className="w-full mb-3 p-2 border rounded"
        />
        <div className="flex justify-between">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button onClick={onSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 mt-40 ml-96">
      <div className="flex justify-between ml-96  mb-20 ">
        <button className="text-blue-500 ml-4"><ChevronLeft size={24} /></button>
        <button 
          onClick={() => setIsAddingRecord(true)} 
          className="bg-blue-500 text-white px-4 py-2 rounded-full flex "
        >
          <Plus size={20} className="mr-2" /> Add Collection
        </button>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-lg  mb-14 flex gap-40 w-[984px] h-[150px] ml-44">
        <p className="text-xl text-black ">Cooperative No: Muguga Dairy</p>
        <p className="text-xl text-black">Phone No: 0716626362</p>
        <p className="text-xl text-black">Joined: Oct. 2016</p>
      </div>

      <table className="w-[1290px] ml-2">
        <thead>
          <tr className="text-left text-blue-500 border-b text-2xl">
            <th className="pb-2">Date</th>
            <th className="pb-2">Quantity(L)</th>
            <th className="pb-2">Sale (Litre)</th>
            <th className="pb-2"></th>
          </tr>
        </thead>
        <tbody>
          {milkRecords.map((record, index) => (
            <tr key={index} className="bg-white mb-2 border-b text-2xl">
              <td className="p-3">{new Date(record.date).toLocaleDateString()}</td>
              <td className="p-3">{record.milk_quantity}</td>
              <td className="p-3">{record.price}</td>
              <td className="p-3">
                <button onClick={() => handleEdit(record)} className="text-gray-500">
                  <Edit size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex  mt-40">
        <button className="mx-1 px-3 py-1 border rounded text-blue-400 ml-96"><ChevronLeftIcon size={20} /></button>
        {[1, 2, 3, 4, 5].map((page) => (
          <button 
            key={page} 
            className={`mx-1 px-3 py-1 border rounded ${page === 1 ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
          >
            {page}
          </button>
        ))}
        <button className="mx-1 px-3 py-1 border rounded text-blue-500"><ChevronRight size={20} /></button>
      </div>

      {editingRecord && (
        <RecordForm 
          record={editingRecord} 
          onSave={handleSave} 
          onCancel={() => setEditingRecord(null)} 
          title="Edit Record" 
        />
      )}

      {isAddingRecord && (
        <RecordForm 
          record={newRecord} 
          onSave={handleAdd} 
          onCancel={() => setIsAddingRecord(false)} 
          title="Add New Collection" 
        />
      )}
    </div>
  );
};

export default MilkRecordsTable;
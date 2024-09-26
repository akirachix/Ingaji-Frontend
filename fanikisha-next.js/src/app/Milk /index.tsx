'use client';
import React, { useState } from 'react';
import { useMilkRecords } from '../hooks/milkRecords';

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
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      backgroundColor: 'rgba(0,0,0,0.5)', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        width: '300px'
      }}>
        <h3 style={{ marginBottom: '15px' }}>{title}</h3>
        <input 
          type="date" 
          name="date" 
          value={record.date} 
          onChange={(e) => handleChange(e, onSave === handleAdd ? setNewRecord : setEditingRecord)}
          style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
        />
        <input 
          type="number" 
          name="milk_quantity" 
          value={record.milk_quantity} 
          onChange={(e) => handleChange(e, onSave === handleAdd ? setNewRecord : setEditingRecord)}
          placeholder="Quantity (L)"
          style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
        />
        <input 
          type="number" 
          name="price" 
          value={record.price} 
          onChange={(e) => handleChange(e, onSave === handleAdd ? setNewRecord : setEditingRecord)}
          placeholder="Sale (Litre)"
          style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={onCancel} style={{ padding: '5px 10px', backgroundColor: '#f0f0f0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
          <button onClick={onSave} style={{ padding: '5px 10px', backgroundColor: '#4a90e2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '20px auto', padding: '20px', backgroundColor: '#f8f8f8' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button style={{ background: 'none', border: 'none', color: '#4a90e2', fontSize: '24px', cursor: 'pointer' }}>&larr;</button>
        <button 
          onClick={() => setIsAddingRecord(true)} 
          style={{ backgroundColor: '#4a90e2', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '14px' }}
        >
          Add Collection
        </button>
      </div>
      
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Miriam Koome</h2>
        <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>Cooperative No: Muguga Dairy</p>
        <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>Phone No: 0716626362</p>
        <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>Joined: Oct. 2016</p>
      </div>

      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px', backgroundColor: 'transparent' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', textAlign: 'left', color: '#4a90e2', fontSize: '14px', fontWeight: 'normal' }}>Date</th>
            <th style={{ padding: '10px', textAlign: 'left', color: '#4a90e2', fontSize: '14px', fontWeight: 'normal' }}>Quantity(L)</th>
            <th style={{ padding: '10px', textAlign: 'left', color: '#4a90e2', fontSize: '14px', fontWeight: 'normal' }}>Sale (Litre)</th>
            <th style={{ padding: '10px', textAlign: 'left', color: '#4a90e2', fontSize: '14px', fontWeight: 'normal' }}></th>
          </tr>
        </thead>
        <tbody>
          {milkRecords.map((record, index) => (
            <tr key={index} style={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '4px' }}>
              <td style={{ padding: '15px', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px' }}>{new Date(record.date).toLocaleDateString()}</td>
              <td style={{ padding: '15px' }}>{record.milk_quantity}</td>
              <td style={{ padding: '15px' }}>{record.price}</td>
              <td style={{ padding: '15px', borderTopRightRadius: '4px', borderBottomRightRadius: '4px' }}>
                <button onClick={() => handleEdit(record)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>✎</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <button style={{ margin: '0 5px', padding: '5px 10px', border: '1px solid #e0e0e0', backgroundColor: 'white', color: '#4a90e2', borderRadius: '4px', cursor: 'pointer' }}>&lt;</button>
        {[1, 2, 3, 4, 5].map((page) => (
          <button 
            key={page} 
            style={{ 
              margin: '0 5px', 
              padding: '5px 10px', 
              border: '1px solid #e0e0e0', 
              backgroundColor: page === 1 ? '#4a90e2' : 'white', 
              color: page === 1 ? 'white' : '#4a90e2',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {page}
          </button>
        ))}
        <button style={{ margin: '0 5px', padding: '5px 10px', border: '1px solid #e0e0e0', backgroundColor: 'white', color: '#4a90e2', borderRadius: '4px', cursor: 'pointer' }}>&gt;</button>
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
'use client';
import React, { useState, useEffect, ReactNode } from 'react';
import { IoArrowBack, IoPencil, IoAddCircleOutline } from 'react-icons/io5';
import Layout from '../Layout';
import { useMilkRecords } from '../hooks/milkRecords';
interface MilkRecord {
  id: string;
  milk_quantity: number;
  price: number;
  first_name: string;
  last_name: string;
}
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Milk Collection</h2>
          <button onClick={onClose} className="text-customBlue text-2xl">X</button>
        </div>
        <form onSubmit={onSubmit}>
          {children}
          <div className="flex justify-end mt-4">
            <button type="submit" className="bg-customBlue text-white px-4 py-2 rounded">
              Save
            </button>
            <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded ml-2">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
function MilkCollectionPage() {
  const farmerId = 1;
  const { milkRecords: initialRecords, loading, error } = useMilkRecords(farmerId);
  const [milkRecords, setMilkRecords] = useState<MilkRecord[]>(initialRecords || []);
  const [newCollection, setNewCollection] = useState<MilkRecord>({
    id: '',
    milk_quantity: 0,
    price: 0,
    first_name: '',
    last_name: '',
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    if (initialRecords) {
      setMilkRecords(initialRecords);
    }
  }, [initialRecords]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCollection((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const collectionToAdd: MilkRecord = {
      ...newCollection,
      milk_quantity: parseFloat(newCollection.milk_quantity.toString()),
      price: parseFloat(newCollection.price.toString()),
    };
    if (editIndex !== null) {
      const updatedCollections = [...milkRecords];
      updatedCollections[editIndex] = collectionToAdd;
      setMilkRecords(updatedCollections);
    } else {
      setMilkRecords((prev) => [...prev, collectionToAdd]);
    }
    resetForm();
  };
  const resetForm = () => {
    setNewCollection({ id: '', milk_quantity: 0, price: 0, first_name: '', last_name: '' });
    setShowForm(false);
    setEditIndex(null);
  };
  const handleEdit = (index: number) => {
    setNewCollection(milkRecords[index]);
    setEditIndex(index);
    setShowForm(true);
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <Layout>
      <div className="container mx-auto p-4 mt-12">
        <div className="flex items-center justify-between mb-4">
          <IoArrowBack className="text-blue-500 text-2xl" />
          <button
            onClick={() => { setShowForm(true); setEditIndex(null); }}
            className="bg-blue-500 text-white px-4 text-[24px] py-2 rounded-full flex items-center">
            <IoAddCircleOutline className="mr-1" /> Add Collection
          </button>
        </div>
        <Modal isOpen={showForm} onClose={resetForm} onSubmit={handleSubmit}>
          <input
            type="date"
            name="date"
            value={newCollection.id}
            onChange={handleChange}
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded" />
          <input
            type="number"
            name="milk_quantity"
            value={newCollection.milk_quantity}
            onChange={handleChange}
            placeholder="Quantity (L)"
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded" />
          <input
            type="number"
            name="price"
            value={newCollection.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded" />
          <input
            type="text"
            name="first_name"
            value={newCollection.first_name}
            onChange={handleChange}
            placeholder="First Name"
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded" />
          <input
            type="text"
            name="last_name"
            value={newCollection.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded" />
        </Modal>
        <table className="w-full mt-12">
          <thead>
            <tr className="border-b-4 border-blue-500">
              <th className="w-1/4 text-left py-2 text-[24px] text-blue-500">First Name</th>
              <th className="w-1/4 text-left py-2 text-[24px] text-blue-500">Last Name</th>
              <th className="w-1/4 text-left py-2 text-[24px] text-blue-500">Quantity (L)</th>
              <th className="w-1/4 text-left py-2 text-[24px] text-blue-500">Price</th>
              <th className="w-1/4 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {milkRecords.map((collection, index) => (
              <tr key={index} className="border-b border-black">
                <td className="py-3">{collection.first_name}</td>
                <td className="py-3">{collection.last_name}</td>
                <td className="py-3">{collection.milk_quantity}</td>
                <td className="py-3">{collection.price}</td>
                <td className="py-3 text-center">
                  <button onClick={() => handleEdit(index)} className="text-black-500">
                    <IoPencil />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
export default MilkCollectionPage;



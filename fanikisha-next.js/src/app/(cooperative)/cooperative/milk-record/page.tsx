
'use client';
import React, { useState, useEffect } from "react";
import { MdSearch } from "react-icons/md";
import { IoArrowBack, IoPencil, IoAddCircleOutline } from "react-icons/io5";
import { useMilkRecord } from "@/app/hooks/useMilkRecord";
import Layout from "@/app/Layout";

interface MilkRecord {
  record_id: number;
  first_name: string;
  last_name: string;
  milk_quantity: number;
  price: number;
  date: string;
}

const CombinedMilkRecordsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: milkRecords, loading, error } = useMilkRecord();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [selectedFarmer, setSelectedFarmer] = useState<MilkRecord | null>(null);
  const [farmerCollections, setFarmerCollections] = useState<MilkRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState<MilkRecord | null>(null);
  const [newCollection, setNewCollection] = useState<MilkRecord>({
    record_id: 0,
    first_name: "",
    last_name: "",
    milk_quantity: 0,
    price: 0,
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (selectedFarmer) {

      setFarmerCollections([selectedFarmer]);
    }
  }, [selectedFarmer]);

  if (loading) return <Layout><div className="container mx-auto p-4">Loading...</div></Layout>;
  if (error) return <Layout><div className="container mx-auto p-4">Error: {error}</div></Layout>;

  const filteredRecords = milkRecords
    ? milkRecords.filter((record: MilkRecord) => {
        const total = (record.milk_quantity * record.price).toFixed(2);
        const recordDate = new Date(record.date).toLocaleDateString();
        return (
          record.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.milk_quantity.toString().includes(searchTerm) ||
          record.price.toString().includes(searchTerm) ||
          recordDate.includes(searchTerm) ||
          total.includes(searchTerm)
        );
      })
    : [];

  const totalRecords = filteredRecords.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const handleRowClick = (record: MilkRecord) => {
    setSelectedFarmer(record);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCollection((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingRecord) {
      setFarmerCollections(prevCollections =>
        prevCollections.map(collection =>
          collection.record_id === editingRecord.record_id ? { ...newCollection, record_id: editingRecord.record_id } : collection
        )
      );
    } else {
      const newRecordId = Math.max(...farmerCollections.map(c => c.record_id), 0) + 1;
      setFarmerCollections(prevCollections => [...prevCollections, { ...newCollection, record_id: newRecordId }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setNewCollection({
      record_id: 0,
      first_name: selectedFarmer?.first_name || "",
      last_name: selectedFarmer?.last_name || "",
      milk_quantity: 0,
      price: 0,
      date: new Date().toISOString().split('T')[0],
    });
    setShowForm(false);
    setEditingRecord(null);
  };

  const handleEdit = (record: MilkRecord) => {
    setEditingRecord(record);
    setNewCollection(record);
    setShowForm(true);
  };

  return (
    <Layout>
      <div className="bg-white">
        {!selectedFarmer ? (
          <>
            <header className="text-blue-500 p-4">
              <div className="container mx-auto">
                <h1 className="text-5xl font-bold">Milk Records</h1>
              </div>
            </header>
            <main className="container mx-auto p-4">
              <section className="mt-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="relative flex-grow max-w-lg">
                    <input
                      type="text"
                      placeholder="Search by Name..."
                      className="border border-gray-300 rounded-full px-4 py-2 w-full pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                {currentRecords.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                      <thead>
                        <tr className="bg-gray-50 uppercase text-xs leading-normal tracking-wider border-b border-gray-200">
                          <th className="py-3 px-6 text-left font-bold text-blue-500 text-lg">First Name</th>
                          <th className="py-3 px-6 text-left font-bold text-blue-500 text-lg">Last Name</th>
                          <th className="py-3 px-6 text-left font-bold text-blue-500 text-lg">Quantity (L)</th>
                          <th className="py-3 px-6 text-left font-bold text-blue-500 text-lg">Price per Litre</th>
                          <th className="py-3 px-6 text-left font-bold text-blue-500 text-lg">Date</th>
                          <th className="py-3 px-6 text-left font-bold text-blue-500 text-lg">Total (Ksh)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentRecords.map((record: MilkRecord) => (
                          <tr
                            key={record.record_id}
                            className="border-b border-gray-200 hover:bg-gray-100 transition duration-200 cursor-pointer"
                            onClick={() => handleRowClick(record)}
                          >
                            <td className="py-3 px-6">{record.first_name}</td>
                            <td className="py-3 px-6">{record.last_name}</td>
                            <td className="py-3 px-6">{record.milk_quantity}</td>
                            <td className="py-3 px-6">{record.price}</td>
                            <td className="py-3 px-6">{new Date(record.date).toLocaleDateString()}</td>
                            <td className="py-3 px-6">{(record.milk_quantity * record.price).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="flex justify-center items-center mt-4">
                      <button
                        className={`mx-1 px-4 py-2 rounded ${
                          currentPage === 1 ? "bg-gray-200 text-gray-700 cursor-not-allowed" : "bg-blue-500 text-white"
                        }`}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        {"<"}
                      </button>
                      {Array.from({ length: totalPages }, (_, index) => (
                        <button
                          key={index}
                          className={`mx-1 px-4 py-2 rounded ${
                            currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                          }`}
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      ))}
                      <button
                        className={`mx-1 px-4 py-2 rounded ${
                          currentPage === totalPages ? "bg-gray-200 text-gray-700 cursor-not-allowed" : "bg-blue-500 text-white"
                        }`}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        {">"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-blue-500 text-lg">No milk records found.</p>
                )}
              </section>
            </main>
          </>
        ) : (
          <div className="container mx-auto p-4 mt-12">
            <div className="flex items-center justify-between mb-4">
              <IoArrowBack 
                onClick={() => setSelectedFarmer(null)} 
                className="text-blue-500 cursor-pointer text-2xl" 
              />
              <button
                onClick={() => { setShowForm(true); }}
                className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center"
              >
                <IoAddCircleOutline className="mr-2" /> Add Collection
              </button>
            </div>

            {showForm && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                  <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold">
                      {editingRecord ? "Edit Milk Collection" : "Add Milk Collection"}
                    </h2>
                    <button onClick={resetForm} className="text-customBlue text-xl">X</button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="date"
                      name="date"
                      value={newCollection.date}
                      onChange={handleChange}
                      required
                      className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="number"
                      name="milk_quantity"
                      value={newCollection.milk_quantity}
                      onChange={handleChange}
                      placeholder="Quantity (L)"
                      required
                      className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="number"
                      name="price"
                      value={newCollection.price}
                      onChange={handleChange}
                      placeholder="Price"
                      required
                      className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                    <div className="flex justify-end mt-4">
                      <button type="submit" className="bg-customBlue text-white px-4 py-2 rounded">
                        {editingRecord ? "Update" : "Save"}
                      </button>
                      <button type="button" onClick={resetForm} className="bg-red-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <h2 className="text-2xl font-bold mb-4">Farmer Details</h2>
            <p><strong>Name:</strong> {selectedFarmer.first_name} {selectedFarmer.last_name}</p>
            <p><strong>Last Collection:</strong> {new Date(selectedFarmer.date).toLocaleDateString()}</p>
            <p><strong>Quantity:</strong> {selectedFarmer.milk_quantity} L</p>
            <p><strong>Price:</strong> {selectedFarmer.price} per liter</p>

            <h3 className="text-xl font-bold mt-8 mb-4">Collection History</h3>
            <table className="w-full mt-4">
              <thead>
                <tr className="border-b-4 border-blue-500">
                  <th className="text-left py-2 text-lg text-blue-500">Date</th>
                  <th className="text-left py-2 text-lg text-blue-500">Quantity (L)</th>
                  <th className="text-left py-2 text-lg text-blue-500">Price</th>
                  <th className="text-center"></th>
                </tr>
              </thead>
              <tbody>
                {farmerCollections.map((collection) => (
                  <tr key={collection.record_id} className="border-b border-black">
                    <td className="py-3">{new Date(collection.date).toLocaleDateString()}</td>
                    <td className="py-3">{collection.milk_quantity}</td>
                    <td className="py-3">{collection.price}</td>
                    <td className="py-3 text-center">
                      <button onClick={() => handleEdit(collection)} className="text-black">
                        <IoPencil />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CombinedMilkRecordsPage;
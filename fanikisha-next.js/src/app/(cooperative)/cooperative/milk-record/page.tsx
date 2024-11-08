'use client';
import React, { useState, useEffect } from "react";
import { MdSearch } from "react-icons/md";
import { IoArrowBack, IoAddCircleOutline } from "react-icons/io5";
import { useMilkRecord } from "@/app/hooks/useMilkRecord";
import Layout from "@/app/Layout";
import { createMilkRecord, fetchMilkRecordByFarmerId } from "@/app/utils/fetchMilkRecords";
import { updateMilkRecord } from "@/app/utils/fetchMilkRecords";

interface MilkRecord {
  record_id: number;
  farmer_id?: number;
  first_name: string;
  last_name: string;
  milk_quantity: number;
  price: number;
  date: string;
  total_value:number;
  total_milk_value: number;
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
  const [loadingCollections, setLoadingCollections] = useState(false);
  const [collectionError, setCollectionError] = useState<string | null>(null);
  const [newCollection, setNewCollection] = useState<MilkRecord>({
    record_id: 0,
    first_name: "",
    last_name: "",
    milk_quantity: 0,
    price: 0,
    date: new Date().toISOString().split('T')[0],
    total_value:0,
    total_milk_value: 0
  });

  useEffect(() => {
    const fetchFarmerCollections = async () => {
      if (selectedFarmer?.farmer_id) {
        setLoadingCollections(true);
        setCollectionError(null);
        try {
          const collections = await fetchMilkRecordByFarmerId(selectedFarmer.farmer_id);
          
          setFarmerCollections(Array.isArray(collections) ? collections : [collections]);
        } catch (error) {
          setCollectionError("Failed to load farmer collections");
          console.error("Error fetching collections:", error);
        } finally {
          setLoadingCollections(false);
        }
      }
    };
  
    if (selectedFarmer) {
      fetchFarmerCollections();
    }
  }, [selectedFarmer]);
  

  if (loading) return <Layout><div className="container mx-auto p-4">Loading...</div></Layout>;
  if (error) return <Layout><div className="container mx-auto p-4">Error: {error}</div></Layout>;

  const filteredRecords = milkRecords
    ? milkRecords.filter((record: MilkRecord) => {
        const recordDate = new Date(record.date).toLocaleDateString();
        return (
          record.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.milk_quantity.toString().includes(searchTerm) ||
          record.price.toString().includes(searchTerm) ||
          recordDate.includes(searchTerm) ||
          record.total_milk_value.toString().includes(searchTerm)
        );
      })
    : [];

  const totalRecords = filteredRecords.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const handleRowClick = async (record: MilkRecord) => {
    setSelectedFarmer(record);
    setLoadingCollections(true);
    setCollectionError(null);
    
    if (record.farmer_id !== undefined) { 
      try {
        const collections = await fetchMilkRecordByFarmerId(record.farmer_id);
        setFarmerCollections(Array.isArray(collections) ? collections : [collections]);
      } catch (error) {
        setCollectionError("Failed to load farmer collections");
        console.error("Error fetching collections:", error);
      } finally {
        setLoadingCollections(false);
      }
    } else {
      console.error("farmer_id is undefined for the selected record");
      setCollectionError("Farmer ID is undefined");
      setLoadingCollections(false);
    }
  };
  
  

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = name === 'milk_quantity' || name === 'price' ? parseFloat(value) : value;
    setNewCollection((prev) => ({
      ...prev,
      [name]: numValue,
    }));

  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const recordData = {
        farmer_id: selectedFarmer?.farmer_id ?? 0, 
        farmer: selectedFarmer?.farmer_id ?? 0,    
        first_name: selectedFarmer?.first_name || "",
        last_name: selectedFarmer?.last_name || "",
        record_id: newCollection.record_id,
        milk_quantity: newCollection.milk_quantity,
        price: newCollection.price,
        date: newCollection.date,
        total_value: newCollection.total_value,
        total_milk_value: newCollection.total_milk_value,
      };
  
      if (editingRecord) {
        const updatedRecord = await updateMilkRecord({
          ...recordData,
          record_id: editingRecord.record_id,
          farmer: selectedFarmer?.farmer_id ?? 0,
        });
        
        setFarmerCollections(prevCollections =>
          prevCollections.map(collection =>
            collection.record_id === editingRecord.record_id ? updatedRecord : collection
          )
        );
      } else {
        const newRecord = await createMilkRecord(recordData);
        setFarmerCollections(prevCollections => [...prevCollections, newRecord]);
      }
      
      resetForm();
    } catch (error) {
      console.error("Error saving record:", error);
      setCollectionError("Failed to save milk record");
    }
  };
  
  

  const resetForm = () => {
    setNewCollection({
      record_id: 0,
      first_name: selectedFarmer?.first_name || "",
      last_name: selectedFarmer?.last_name || "",
      milk_quantity: 0,
      price: 0,
      date: new Date().toISOString().split('T')[0],
      total_value:0,
      total_milk_value: 0
    });
    setShowForm(false);
    setEditingRecord(null);
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
                            <td className="py-3 px-6">{record.total_milk_value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-400">No records found.</div>
                )}
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
              </section>
            </main>
          </>
          
        ) : (
          <main className="container mx-auto p-4">
            <section>
              <div className="flex items-center">
                <div>
                <h2 className="text-2xl font-bold mb-4">Farmer Details</h2>
<p >
  <strong>Name:</strong> {selectedFarmer.first_name} {selectedFarmer.last_name}
</p>
<p>
  <strong>Last Collection:</strong>{" "}
  {new Date(selectedFarmer.date).toLocaleDateString()}
</p>
<p>
  <strong>Quantity:</strong> {selectedFarmer.milk_quantity} L
</p>
<p>
  <strong>Price:</strong> {selectedFarmer.price} per liter
</p>
</div>
              </div>
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
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                  <thead>
                    <tr className="bg-gray-50 uppercase text-xs leading-normal tracking-wider border-b border-gray-200">
                      <th className="py-3 px-6 text-left font-bold text-blue-500 text-lg">Quantity (L)</th>
                      <th className="py-3 px-6 text-left font-bold text-blue-500 text-lg">Price per Litre</th>
                      <th className="py-3 px-6 text-left font-bold text-blue-500 text-lg">Total (Ksh)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingCollections ? (
                      <tr>
                        <td colSpan={5} className="text-center py-5">Loading...</td>
                      </tr>
                    ) : collectionError ? (
                      <tr>
                        <td colSpan={5} className="text-center py-5 text-red-500">{collectionError}</td>
                      </tr>
                    ) : farmerCollections.length > 0 ? (
                      farmerCollections.map((collection) => (
                        <tr key={collection.record_id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-200">
                          <td className="py-3 px-6">{collection.milk_quantity}</td>
                          <td className="py-3 px-6">{collection.price}</td>
                          <td className="py-3 px-6">{collection.total_value}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-10 text-gray-400">No records found for this farmer.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                
              </div>
            </section>
          </main>
        )}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
              <h3 className="text-2xl font-bold">{editingRecord ? "Edit Milk Record" : "Add Milk Record"}</h3>
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4">
                  <label htmlFor="milk_quantity" className="block font-medium">Quantity (L)</label>
                  <input
                    type="number"
                    id="milk_quantity"
                    name="milk_quantity"
                    value={newCollection.milk_quantity}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
  <label htmlFor="price" className="block font-medium">Price per Litre</label>
  <input
    type="number"
    id="price"
    name="price"
    value={newCollection.price || 70} 
    onChange={handleChange}
    className="border border-gray-300 rounded-md px-3 py-2 w-full"
    required
  />
</div>

                <div className="mb-4">
                  <label htmlFor="date" className="block font-medium">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={newCollection.date}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    required
                  />
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mr-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                  >
                    {editingRecord ? "Update Record" : "Save Record"}
                  </button>
                </div>
                
              </form>
            </div>
          </div>
        )}
        
      </div>
    </Layout>
  );
};

export default CombinedMilkRecordsPage;

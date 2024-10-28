'use client';
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useFetchFarmers } from "../../../hooks/useFetchFarmers";
import { Farmer } from "@/app/utils/types";
import AddFarmerModal from "../farmers";
import Layout from "@/app/Layout";


interface MilkCollection {
  id: number;
  record_id: number;
  farmer_id: number;
  milk_quantity: number;
  price: number;
  date: string;
  first_name: string;
  last_name: string;
}

const FarmersDashboard: React.FC = () => {
  const { data, isLoading, error } = useFetchFarmers();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddFarmerModalOpen, setIsAddFarmerModalOpen] = useState(false);
  const [isMilkModalOpen, setIsMilkModalOpen] = useState(false);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [sortedFarmers, setSortedFarmers] = useState<Farmer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [, setMilkCollections] = useState<MilkCollection[]>([]);
  const [newCollection, setNewCollection] = useState<Omit<MilkCollection, 'id' | 'record_id' | 'farmer_id' | 'first_name' | 'last_name'>>({
    milk_quantity: 0,
    price: 0,
    date: new Date().toISOString().split('T')[0],
  });
 
  const farmersPerPage = 10;

  useEffect(() => {
    if (data) {
      if (Array.isArray(data)) {
        setFarmers(data);
      } else {
        console.error("Expected an array but received:", data);
        setFarmers([]);
      }
    }
  }, [data]);

  useEffect(() => {
    const filteredFarmers = farmers.filter((farmer) =>
      farmer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.cooperative_number.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sorted = [...filteredFarmers].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    setSortedFarmers(sorted);
  }, [farmers, searchTerm]);

  useEffect(() => {
    if (selectedFarmer) {
      const farmerCollectionsKey = `farmerCollections_${selectedFarmer.id}`;
      const storedCollections = JSON.parse(localStorage.getItem(farmerCollectionsKey) || '[]');
      setMilkCollections(storedCollections);
    }
  }, [selectedFarmer]);

  const totalFarmers = sortedFarmers.length;
  const totalPages = Math.ceil(totalFarmers / farmersPerPage);
  const indexOfLastFarmer = currentPage * farmersPerPage;
  const indexOfFirstFarmer = indexOfLastFarmer - farmersPerPage;
  const currentFarmers = sortedFarmers.slice(indexOfFirstFarmer, indexOfLastFarmer);

  const formatPhoneNumber = (phone: string) => {
        return phone.slice(0, 4) + phone.slice(4).replace(/\d/g, "X");
      };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleAddFarmer = (postFarmer: Farmer) => {
    const newFarmer = {
      ...postFarmer,
      created_at: new Date().toISOString(),
    };
    setFarmers((prevFarmers) => [newFarmer, ...prevFarmers]);
    setCurrentPage(1);
    setIsAddFarmerModalOpen(false);
  };

  const handleRowClick = (farmer: Farmer) => {
    setSelectedFarmer(farmer);
    setIsMilkModalOpen(true);
  };

  const handleCollectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCollection(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFarmer) return;

   
    const newMilkCollection = {
      id: Date.now(),
      record_id: Date.now(),
      farmer_id: selectedFarmer.id,
      first_name: selectedFarmer.first_name,
      last_name: selectedFarmer.last_name,
      milk_quantity: Number(newCollection.milk_quantity),
      price: Number(newCollection.price),
      date: newCollection.date,
    };

    
    setMilkCollections(prev => [...prev, newMilkCollection]);

    
    const farmerCollectionsKey = `farmerCollections_${selectedFarmer.id}`;
    const existingFarmerCollections = JSON.parse(localStorage.getItem(farmerCollectionsKey) || '[]');
    localStorage.setItem(farmerCollectionsKey, JSON.stringify([...existingFarmerCollections, newMilkCollection]));

    
    let allMilkRecords = JSON.parse(localStorage.getItem('allMilkRecords') || '[]');
    allMilkRecords = [...allMilkRecords, newMilkCollection];
    localStorage.setItem('allMilkRecords', JSON.stringify(allMilkRecords));

   
    const event = new CustomEvent('milkRecordUpdated', {
      detail: {
        type: 'add',
        record: newMilkCollection
      }
    });
    window.dispatchEvent(event);

   
    setIsMilkModalOpen(false);
    setSelectedFarmer(null);
    setNewCollection({
      milk_quantity: 0,
      price: 0,
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <Layout>
      <div>
        <div className="bg-white">
          <header className="text-[#299acf] p-4">
            <div className="container mx-auto">
              <h1 className="text-[40px] font-bold">Accounts</h1>
            </div>
          </header>
          <main className="container mx-auto p-4">
            <section className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <div className="relative flex-grow max-w-lg">
                  <input
                    type="text"
                    placeholder="Search by Name..."
                    className="border border-[#1d4ed8] rounded-full px-4 py-2 w-full pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1d4ed8]" />
                </div>
                <button
                  onClick={() => setIsAddFarmerModalOpen(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ml-4"
                >
                  + Add Farmer
                </button>
              </div>

              {isLoading ? (
                <p className="text-customBlue text-[20px]">Loading farmers...</p>
              ) : error ? (
                <p className="text-customBlue">{error.message}</p>
              ) : sortedFarmers.length === 0 ? (
                <p className="text-customBlue text-[20px]">No farmers data available.</p>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                      <thead>
                        <tr className="bg-gray-50 uppercase text-xs leading-normal tracking-wider border-b border-gray-200">
                          <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">Name</th>
                          <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">Cooperative No</th>
                          <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">Phone Number</th>
                          <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">Join Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentFarmers.map((farmer, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-100 transition duration-200 cursor-pointer"
                            onClick={() => handleRowClick(farmer)}
                          >
                            <td className="py-3 px-6">{farmer.first_name} {farmer.last_name}</td>
                            <td className="py-3 px-6">{farmer.cooperative_number}</td>
                            <td className="py-3 px-6">{formatPhoneNumber(farmer.phone_number)}</td>
                            <td className="py-3 px-6">{formatDate(farmer.created_at)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-center items-center mt-4">
                    <button
                      className={`mx-1 px-4 py-2 rounded ${
                        currentPage === 1
                          ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                          : "bg-blue-500 text-white"
                      }`}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      {"<"}
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        className={`mx-1 px-4 py-2 rounded ${
                          currentPage === index + 1
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      className={`mx-1 px-4 py-2 rounded ${
                        currentPage === totalPages
                          ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                          : "bg-blue-500 text-white"
                      }`}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      {">"}
                    </button>
                  </div>
                </>
              )}
            </section>
          </main>
        </div>

       
        <AddFarmerModal
          isOpen={isAddFarmerModalOpen}
          onClose={() => setIsAddFarmerModalOpen(false)}
          onFarmerAdded={handleAddFarmer}
        />

        
        {isMilkModalOpen && selectedFarmer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Add Milk Collection</h2>
                <button
                  onClick={() => {
                    setIsMilkModalOpen(false);
                    setSelectedFarmer(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                
                </button>
              </div>
             
              <div className="mb-4">
                <p className="text-gray-600">Farmer: {selectedFarmer.first_name} {selectedFarmer.last_name}</p>
              </div>

              <form onSubmit={handleAddCollection}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={newCollection.date}
                    onChange={handleCollectionChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Milk Quantity (L)
                  </label>
                  <input
                    type="number"
                    name="milk_quantity"
                    value={newCollection.milk_quantity}
                    onChange={handleCollectionChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    min="0"
                    step="0.1"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Price per Liter
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={newCollection.price}
                    onChange={handleCollectionChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMilkModalOpen(false);
                      setSelectedFarmer(null);
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Save
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

export default FarmersDashboard;



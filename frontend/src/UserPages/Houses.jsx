import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../UserComponents/Navbar";
import Footer from "../UserComponents/Footer";
import AddHouse from "./AddHouse"; // Import AddHouse

const Houses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddHouseVisible, setIsAddHouseVisible] = useState(false); // State to control form visibility
  const [houses, setHouses] = useState(
    Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      title: `House ${i + 1}`,
      size: `${Math.floor(Math.random() * 500) + 100} sqm`,
      location: `Location ${i + 1}`,
    }))
  ); // Storing houses in state
  const housesPerPage = 10;
  const totalPages = Math.ceil(houses.length / housesPerPage);

  const indexOfLastHouse = currentPage * housesPerPage;
  const indexOfFirstHouse = indexOfLastHouse - housesPerPage;
  const currentHouses = houses.slice(indexOfFirstHouse, indexOfLastHouse);

  const addHouseHandler = () => {
    setIsAddHouseVisible(true); // Show the add house form
  };

  const closeAddHouseForm = () => {
    setIsAddHouseVisible(false); // Hide the add house form
  };

  // Function to handle deletion of a house
  const deleteHouse = (id) => {
    setHouses((prevHouses) => prevHouses.filter((house) => house.id !== id)); // Filter out the house with the given id
  };

  // Function to add a new house to the list
  const addHouse = (newHouse) => {
    setHouses((prevHouses) => [...prevHouses, newHouse]); // Append the new house to the list
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="container mx-auto p-6">
        <div className="py-4">
          <h1 className="text-3xl font-bold text-center mb-6">Your Houses</h1>
          <button
            onClick={addHouseHandler}
            className="mt-2 px-4 py-2 bg-[#A68263] text-white rounded-md hover:bg-opacity-90"
          >
            Add House
          </button>
        </div>

        {/* Conditionally render AddHouse form */}
        {isAddHouseVisible && (
          <div className="mt-6">
            <AddHouse closeForm={closeAddHouseForm} addHouse={addHouse} />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentHouses.map((house) => (
            <div key={house.id}>
              <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition">
                <h2 className="text-xl font-semibold">{house.title}</h2>
                <p className="text-gray-600">Size: {house.size}</p>
                <p className="text-gray-600">Location: {house.location}</p>
                <div className="flex space-x-6 mx-auto justify-between">
                  <Link to={`/house/${house.id}`}>
                    <button className="mt-2 px-4 py-2 bg-[#A68263] text-white rounded-md hover:bg-opacity-90">
                      View Details
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteHouse(house.id)} // Call delete function on click
                    className="mt-2 px-4 py-2 bg-[#A68263] text-white rounded-md hover:bg-opacity-90"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-2 border rounded-md ${
                currentPage === i + 1
                  ? "bg-[#A68263] text-white"
                  : "bg-gray-200"
              } hover:bg-opacity-90`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Houses;

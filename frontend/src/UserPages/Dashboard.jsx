import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../UserComponents/Navbar";
import Footer from "../UserComponents/Footer";

const houses = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  title: `House ${i + 1}`,
  size: `${Math.floor(Math.random() * 500) + 100} sqm`,
  location: `Location ${i + 1}`,
}));

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const housesPerPage = 10;
  const totalPages = Math.ceil(houses.length / housesPerPage);

  const indexOfLastHouse = currentPage * housesPerPage;
  const indexOfFirstHouse = indexOfLastHouse - housesPerPage;
  const currentHouses = houses.slice(indexOfFirstHouse, indexOfLastHouse);

  return (
    <div>
        <div>
            <Navbar/>
        </div>
        <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Available Houses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentHouses.map((house) => (
          <Link to={`/house/${house.id}`} key={house.id}>
            <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition">
              <h2 className="text-xl font-semibold">{house.title}</h2>
              <p className="text-gray-600">Size: {house.size}</p>
              <p className="text-gray-600">Location: {house.location}</p>
              <button className="mt-2 px-4 py-2 bg-[#A68263] text-white rounded-md hover:bg-opacity-90">
                View Details
              </button>
            </div>
          </Link>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-2 border rounded-md ${
              currentPage === i + 1 ? "bg-[#A68263] text-white" : "bg-gray-200"
            } hover:bg-opacity-90`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
    <div>
        <Footer/>
    </div>
    </div>
  );
};

export default Dashboard;

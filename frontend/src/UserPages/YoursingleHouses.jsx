import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../UserComponents/Navbar";


const YourSingleHouse = () => {
  const { id } = useParams();
  const [house, setHouse] = useState(null);

  useEffect(() => {
    // Fetch house details (Replace with actual API call)
    const fetchHouse = async () => {
      const houseData = {
        id,
        title: `House ${id}`,
        size: "350 sqm",
        location: "Downtown City",
        price: "$500,000",
        bedrooms: 4,
        bathrooms: 3,
        description: "A luxurious modern house with stunning views and amenities.",
        image: "https://via.placeholder.com/600",
      };
      setHouse(houseData);
    };
    fetchHouse();
  }, [id]);

  if (!house) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2">
          <img src={house.image} alt={house.title} className="w-full h-96 object-cover rounded-lg" />
        </div>
        <div className="w-full lg:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{house.title}</h1>
          <p className="text-gray-600">{house.description}</p>
          <p><strong>Size:</strong> {house.size}</p>
          <p><strong>Location:</strong> {house.location}</p>
          <p><strong>Price:</strong> {house.price}</p>
          <p><strong>Bedrooms:</strong> {house.bedrooms}</p>
          <p><strong>Bathrooms:</strong> {house.bathrooms}</p>
          <button className="px-6 py-3 bg-[#A68263] text-white rounded-md hover:bg-opacity-90">
            Reserve
          </button>
        </div>
      </div>

    </div>
  );
};

export default YourSingleHouse;

import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../UserComponents/Navbar";

const sampleCart = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  title: `House ${i + 1}`,
  size: `${Math.floor(Math.random() * 500) + 100} sqm`,
  location: `Location ${i + 1}`,
}));

const CartPage = () => {
  const [cart, setCart] = useState(sampleCart);

  const removeFromCart = (id) => {
    setCart(cart.filter((house) => house.id !== id));
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-black-500">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((house) => (
              <div key={house.id} className="flex items-center border p-4 rounded-lg shadow-md">
                <div className="w-1/4">
                  <h3 className="text-lg font-semibold">{house.title}</h3>
                </div>
                <div className="w-1/2">
                  <p className="text-gray-600">Size: {house.size}</p>
                  <p className="text-gray-600">Location: {house.location}</p>
                </div>
                <div className="w-1/4 flex justify-end gap-4">
                  <Link to={`/house/${house.id}`}>
                    <button className="px-4 py-2 bg-[#A68263] text-white rounded-md hover:bg-opacity-90">
                      Reserve
                    </button>
                  </Link>
                  <button
                    onClick={() => removeFromCart(house.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-opacity-90"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

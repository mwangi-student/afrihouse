import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const HouseContext = createContext();

export const HouseProvider = ({ children }) => {
    const navigate = useNavigate();
    const [houses, setHouses] = useState([]);
    const [currentHouse, setCurrentHouse] = useState(null);
    const [authToken] = useState(() => sessionStorage.getItem("token") || null);

    // Fetch all houses
    const fetchHouses = () => {
        fetch("http://127.0.0.1:5000/houses", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
        .then((resp) => resp.json())
        .then((data) => setHouses(data))
        .catch((error) => console.error("Error fetching houses:", error));
    };

    // Fetch a single house
    const fetchSingleHouse = (houseId) => {
        fetch(`http://127.0.0.1:5000/houses/${houseId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
        .then((resp) => resp.json())
        .then((data) => setCurrentHouse(data))
        .catch((error) => console.error("Error fetching house:", error));
    };

    // Add a house
    const addHouse = (houseData) => {
        toast.loading("Adding house...");
        fetch("http://127.0.0.1:5000/houses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(houseData),
        })
        .then((resp) => resp.json())
        .then((data) => {
            toast.dismiss();
            if (data.success) {
                setHouses([...houses, data.house]);
                toast.success("House added successfully!");
                navigate("/houses");
            } else {
                toast.error(data.error || "Failed to add house.");
            }
        })
        .catch((error) => {
            toast.dismiss();
            toast.error("Network error during house addition.");
            console.error("Add house error:", error);
        });
    };

    // Update a house
    const updateHouse = (houseId, updatedData) => {
        toast.loading("Updating house...");
        fetch(`http://127.0.0.1:5000/houses/${houseId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(updatedData),
        })
        .then((resp) => resp.json())
        .then((data) => {
            toast.dismiss();
            if (data.success) {
                setHouses(houses.map((house) => (house.id === houseId ? data.house : house)));
                toast.success("House updated successfully!");
            } else {
                toast.error(data.error || "Failed to update house.");
            }
        })
        .catch((error) => {
            toast.dismiss();
            toast.error("Network error during update.");
            console.error("Update house error:", error);
        });
    };

    // Delete a house
    const deleteHouse = (houseId) => {
        toast.loading("Deleting house...");
        fetch(`http://127.0.0.1:5000/houses/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            toast.dismiss();
            if (data.success) {
                setHouses(houses.filter((house) => house.id !== id));
                toast.success("House deleted successfully!");
            } else {
                toast.error(data.error || "Failed to delete house.");
            }
        })
        .catch((error) => {
            toast.dismiss();
            toast.error("Network error during deletion.");
            console.error("Delete house error:", error);
        });
    };

    useEffect(() => {
        fetchHouses();
    }, []);

    return (
        <HouseContext.Provider
            value={{ houses, currentHouse, fetchHouses, fetchSingleHouse, addHouse, updateHouse, deleteHouse }}
        >
            {children}
        </HouseContext.Provider>
    );
};

import { useState } from "react";
import Navbar from "../UserComponents/Navbar";
import Footer from "../UserComponents/Footer";

const EditProfile = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 w-full mb-2 rounded"
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="border p-2 w-full mb-2 rounded"
        placeholder="Email"
      />
      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        className="border p-2 w-full mb-2 rounded"
        placeholder="Bio"
      ></textarea>
      <div className="flex justify-center gap-4">
        <button onClick={() => onSave(formData)} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Save</button>
        <button onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">Cancel</button>
      </div>
    </div>
  );
};

const Profile = () => {
  const [user, setUser] = useState({
    avatar: "https://via.placeholder.com/150",
    name: "John Doe",
    email: "johndoe@example.com",
    bio: "A passionate user of our platform. Loves real estate and architecture."
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = (updatedUser) => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      alert("Account Deleted");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 flex flex-col items-center">
        {isEditing ? (
          <EditProfile user={user} onSave={handleSaveProfile} onCancel={() => setIsEditing(false)} />
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-700 mt-2">{user.bio}</p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={handleEditProfile}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Edit Profile
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Profile;

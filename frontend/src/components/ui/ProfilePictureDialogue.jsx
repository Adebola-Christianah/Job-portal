import React, { useState } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';

const ProfileEditDialog = ({ user, isModalOpen, setIsModalOpen }) => {
  const [imagePreview, setImagePreview] = useState(user.profile.profilePhoto || '');
  const [file, setFile] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  // Save changes to profile picture
// Save changes to profile picture
const handleSaveChanges = async () => {
  if (file) {
    const formData = new FormData();
    formData.append("file", file); // Removed extra space

    try {
      console.log(formData,'form data')
      const response = await axios.post(`${USER_API_END_POINT}/profile-picture/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
console.log(response)
      if (response.data.success) {
        // Update the image preview after successful upload
        setImagePreview(response?.data?.data?.profile?.profilePhoto);
        alert('Profile picture updated successfully');
      } else {
        alert('Failed to update profile picture');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('An error occurred while updating the profile picture');
    }

    // Close the modal after saving changes
    setIsModalOpen(false);
  }
};


  // Open and close modal functions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFile(null); // Reset file state when closing modal
    setImagePreview(user.profile.profilePhoto || ''); // Reset image preview
  };

  return (
    <div>
      <button onClick={openModal} className="btn">Edit Profile</button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
          <div className="flex justify-between bg-white text-black rounded-lg shadow-lg p-8 w-full max-w-md">
            {/* Modal Close Button */}
            

       <div>
       <p className="text-gray-600 mb-4">{user.fullname}, help others recognize you!</p>
           

            {/* Image and Upload Section */}
            <div className="flex flex-col items-center mb-4 gap-4">
              {/* Image Preview Section */}
              <div className="relative w-36 h-36 rounded-full overflow-hidden bg-slate-50 flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              {/* Upload Button Section */}
              <div className="flex flex-col items-center justify-center border-dashed border-2 border-gray-400 rounded-md py-4 px-12 cursor-pointer">
                <label className="cursor-pointer flex flex-col">
                  <div className="flex items-center justify-center">
                  </div>
                  <span className="text-blue-500 underline">Click to upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    onClick={(e) => { e.target.value = null; }} // Reset input value
                  />
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between w-full mt-8">
              <button
                className="text-blue-600 bg-gray-200 px-4 py-2 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>

              {file && (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleSaveChanges}
                >
                  Save changes
                </button>
              )}
            </div>
       </div>
       <button
              className=" h-4 w-4 text-gray-400 hover:text-black px-[0.7rem] py-[0.3rem] "
              onClick={closeModal}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileEditDialog;

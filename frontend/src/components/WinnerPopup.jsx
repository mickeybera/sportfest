import React, { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

function WinnerPopup({ item, onClose }) {
  const [newWinner, setNewWinner] = useState({
    winnerName: '',
    score: '',
    profilePic: '',
    description: '',
  });

  const [winners, setWinners] = useState(Array.isArray(item.winners) ? item.winners : []);
  const [editingIndex, setEditingIndex] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const docRef = doc(db, 'games', item.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setWinners(docSnap.data().winners || []);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching winners:', error);
      }
    };

    fetchWinners();
  }, [item.id]);

  // Image upload function
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (!file) return;

    const storageRef = ref(storage, `winner-profile-pics/${file.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, file); // Upload to Firebase
      const url = await getDownloadURL(snapshot.ref); // Get the download URL
      
      console.log("Uploaded Image URL:", url); // Debugging

      setNewWinner((prev) => ({
        ...prev,
        profilePic: url, // Store the URL
      }));

      toast.success('Profile picture uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image. Try again.');
    }
  };

  // Add or Update the winner in Firebase
  const handleAddOrUpdateWinner = async () => {
    if (!newWinner.winnerName.trim() || !newWinner.score.trim()) {
      toast.error('Please enter both winner name and score');
      return;
    }

    // Ensure description is included in the winner data
    const updatedWinners = [...winners];
    if (editingIndex !== null) {
      updatedWinners[editingIndex] = newWinner; // Update with the description
    } else {
      updatedWinners.push(newWinner); // Add the description
    }

    try {
      const docRef = doc(db, 'games', item.id);
      await updateDoc(docRef, { winners: updatedWinners });

      setWinners(updatedWinners);
      setNewWinner({ winnerName: '', score: '', profilePic: '', description: '' }); // Reset the form with description cleared
      setEditingIndex(null);

      toast.success(editingIndex !== null ? 'Winner updated successfully!' : 'Winner added successfully!');
    } catch (error) {
      console.error('Error updating winners:', error);
      toast.error('Failed to update winners. Please try again.');
    }
  };

  // Delete a winner from the list
  const handleDeleteWinner = async (index) => {
    const updatedWinners = winners.filter((_, i) => i !== index);
    try {
      const docRef = doc(db, 'games', item.id);
      await updateDoc(docRef, { winners: updatedWinners });
      setWinners(updatedWinners);
      toast.success('Winner deleted successfully!');
    } catch (error) {
      console.error('Error deleting winner:', error);
      toast.error('Failed to delete winner. Please try again.');
    }
  };

  // Edit an existing winner
  const handleEditWinner = (index) => {
    setNewWinner(winners[index]);
    setEditingIndex(index);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 sm:p-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full h-full max-w-4xl max-h-screen overflow-y-auto flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">🏆 Winners List</h2>

        <ul className="flex-1 overflow-y-auto px-4 list-none mb-4 text-gray-700 dark:text-gray-300">
          {winners.length > 0 ? (
            winners.map((winner, index) => (
              <li key={index} className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg mb-2">
                {winner.profilePic && (
                  <img
                    src={winner.profilePic}
                    alt="Winner"
                    className="w-8 h-8 rounded-full border border-gray-600 object-cover"
                    onError={(e) => e.target.style.display = 'none'} // Hide broken images
                  />
                )}
                <div className="text-gray-900 dark:text-gray-100 text-lg font-semibold">
                  {winner.winnerName} <span className="text-sm font-normal">({winner.score})</span>
                </div>
                {currentUser && (
                  <div className="ml-auto flex gap-2">
                    <button
                      onClick={() => handleEditWinner(index)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteWinner(index)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))
          ) : (
            <li className="text-gray-900 dark:text-gray-100">No winners available!</li>
          )}
        </ul>

        {currentUser && (
          <div className="flex flex-col gap-4 mb-4 px-4">
            <input
              type="text"
              value={newWinner.winnerName}
              onChange={(e) => setNewWinner({ ...newWinner, winnerName: e.target.value })}
              placeholder="Enter winner's name"
              className="p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              value={newWinner.score}
              onChange={(e) => setNewWinner({ ...newWinner, score: e.target.value })}
              placeholder="Enter winner's score"
              className="p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            />
            <textarea
              value={newWinner.description}
              onChange={(e) => setNewWinner({ ...newWinner, description: e.target.value })}
              placeholder="Enter winner's description"
              className="p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              rows="3"
            ></textarea>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleAddOrUpdateWinner}
              className="w-full p-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
            >
              {editingIndex !== null ? 'Update Winner' : 'Add Winner'}
            </button>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full p-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default WinnerPopup;

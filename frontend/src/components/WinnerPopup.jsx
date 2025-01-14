import React, { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

function WinnerPopup({ item, onClose }) {
  const [newWinner, setNewWinner] = useState({ winnerName: '', score: '', emojis: [] });
  const [winners, setWinners] = useState(Array.isArray(item.winners) ? item.winners : []);
  const [editingIndex, setEditingIndex] = useState(null);
  const { currentUser } = useAuth();

  // Fetch winners from Firestore whenever the item changes
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
  }, [item.id]); // Dependency array ensures fetching when item.id changes

  const handleAddOrUpdateWinner = async () => {
    if (!newWinner.winnerName.trim() || !newWinner.score.trim()) {
      toast.error('Please enter both winner name and score');
      return;
    }

    const updatedWinners = [...winners];
    if (editingIndex !== null) {
      // Update existing winner
      updatedWinners[editingIndex] = newWinner;
    } else {
      // Add new winner
      updatedWinners.push(newWinner);
    }

    try {
      // Update Firestore
      const docRef = doc(db, 'games', item.id);
      await updateDoc(docRef, { winners: updatedWinners });

      // Update local state
      setWinners(updatedWinners);

      // Clear input fields
      setNewWinner({ winnerName: '', score: '', emojis: [] });
      setEditingIndex(null);

      toast.success(editingIndex !== null ? 'Winner updated successfully!' : 'Winner added successfully!');
    } catch (error) {
      console.error('Error updating winners:', error);
      toast.error('Failed to update winners. Please try again.');
    }
  };

  const handleDeleteWinner = async (index) => {
    const updatedWinners = winners.filter((_, i) => i !== index);

    try {
      // Update Firestore
      const docRef = doc(db, 'games', item.id);
      await updateDoc(docRef, { winners: updatedWinners });

      // Update local state
      setWinners(updatedWinners);

      toast.success('Winner deleted successfully!');
    } catch (error) {
      console.error('Error deleting winner:', error);
      toast.error('Failed to delete winner. Please try again.');
    }
  };

  const handleEditWinner = (index) => {
    setNewWinner(winners[index]);
    setEditingIndex(index);
  };

  const handleEmojiChange = (e) => {
    const files = Array.from(e.target.files);
    const newEmojis = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        newEmojis.push(event.target.result);
        if (newEmojis.length === files.length) {
          setNewWinner((prev) => ({
            ...prev,
            emojis: [...prev.emojis, ...newEmojis],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 sm:p-6">
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">🏆 Winners List</h2>

        {/* Winners List */}
        <ul className="mx-2 list-disc pl-5 mb-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
          {winners.length > 0 ? (
            winners.map((winner, index) => (
              <li key={index} className="flex flex-col gap-2">
                <div className="flex items-center">
                  {winner.emojis &&
                    winner.emojis.map((emoji, i) => (
                      <img
                        key={i}
                        src={emoji}
                        alt="Winner emoji"
                        className="w-6 h-6 object-cover rounded-full"
                        style={{ margin: 0 }}
                      />
                    ))}
                  <strong className="ml-2">{winner.winnerName}</strong>: {winner.score}
                </div>
                {/* Show Update and Delete Buttons Only if Logged In */}
                {currentUser && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEditWinner(index)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteWinner(index)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))
          ) : (
            <li>No winners available!</li>
          )}
        </ul>

        {/* Add or Update Winner Input */}
        {currentUser && (
          <div className="flex flex-col gap-4 mb-4">
            <textarea
              type="text"
              value={newWinner.winnerName}
              onChange={(e) => setNewWinner({ ...newWinner, winnerName: e.target.value })}
              placeholder="Enter winner's name"
              className="w-full px-3 py-2 border rounded-md text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-400"
            />
            <input
              type="number"
              value={newWinner.score}
              onChange={(e) => setNewWinner({ ...newWinner, score: e.target.value })}
              placeholder="Enter winner's score"
              className="w-full px-3 py-2 border rounded-md text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-400"
            />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleEmojiChange}
              className="w-full px-3 py-2 border rounded-md text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700"
            />
            <button
              onClick={handleAddOrUpdateWinner}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all"
            >
              {editingIndex !== null ? 'Update Winner' : 'Add Winner'}
            </button>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default WinnerPopup;

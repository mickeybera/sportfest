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

  const handleAddOrUpdateWinner = async () => {
    if (!newWinner.winnerName.trim() || !newWinner.score.trim()) {
      toast.error('Please enter both winner name and score');
      return;
    }

    const updatedWinners = [...winners];
    if (editingIndex !== null) {
      updatedWinners[editingIndex] = newWinner;
    } else {
      updatedWinners.push(newWinner);
    }

    try {
      const docRef = doc(db, 'games', item.id);
      await updateDoc(docRef, { winners: updatedWinners });
      setWinners(updatedWinners);
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
      const docRef = doc(db, 'games', item.id);
      await updateDoc(docRef, { winners: updatedWinners });
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 sm:p-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full h-full max-w-4xl max-h-screen overflow-y-auto flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-center">🏆 Winners List</h2>

        <ul className="flex-1 overflow-y-auto px-4 list-disc pl-5 mb-4 text-gray-700 dark:text-gray-300">
          {winners.length > 0 ? (
            winners.map((winner, index) => (
              <li key={index} className="flex flex-col gap-2">
                <div className="flex items-center">
                  {winner.emojis && winner.emojis.map((emoji, i) => (
                    <img key={i} src={emoji} alt="Winner emoji" className="w-6 h-6 rounded-full" />
                  ))}
                  <strong className="ml-2">{winner.winnerName}</strong>: {winner.score}
                </div>
                {currentUser && (
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => handleEditWinner(index)} className="px-3 py-1 bg-blue-600 text-white rounded-md">Update</button>
                    <button onClick={() => handleDeleteWinner(index)} className="px-3 py-1 bg-red-600 text-white rounded-md">Delete</button>
                  </div>
                )}
              </li>
            ))
          ) : (
            <li>No winners available!</li>
          )}
        </ul>

        {currentUser && (
          <div className="flex flex-col gap-4 mb-4 px-4">
            <input type="text" value={newWinner.winnerName} onChange={(e) => setNewWinner({ ...newWinner, winnerName: e.target.value })} placeholder="Enter winner's name" className="p-2 border rounded-md" />
            <input type="number" value={newWinner.score} onChange={(e) => setNewWinner({ ...newWinner, score: e.target.value })} placeholder="Enter winner's score" className="p-2 border rounded-md" />
            <button onClick={handleAddOrUpdateWinner} className="w-full p-2 bg-green-600 text-white rounded-md">{editingIndex !== null ? 'Update Winner' : 'Add Winner'}</button>
          </div>
        )}

        <button onClick={onClose} className="w-full p-2 bg-red-600 text-white rounded-md">Close</button>
      </div>
    </div>
  );
}

export default WinnerPopup;

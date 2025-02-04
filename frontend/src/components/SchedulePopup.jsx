import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { FaEdit, FaTrash } from 'react-icons/fa';

function SchedulePopup({ item, onClose }) {
  const { currentUser } = useAuth();
  const [scheduleData, setScheduleData] = useState({
    date: '',
    time: '',
    description: '',
    participants: '',
    opponent: '',
    participantImage: '',
  });
  const [scheduleList, setScheduleList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      const docRef = doc(db, 'games', item.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setScheduleList(docSnap.data().schedule || []);
      }
    };
    fetchSchedule();
  }, [item.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScheduleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      toast.error('You must be logged in to add or edit schedules.');
      return;
    }

    let imageUrl = scheduleData.participantImage;

    if (imageFile) {
      const imageRef = ref(storage, `participants/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    try {
      const docRef = doc(db, 'games', item.id);
      let updatedSchedule;

      if (editingIndex !== null) {
        updatedSchedule = [...scheduleList];
        updatedSchedule[editingIndex] = { ...scheduleData, participantImage: imageUrl, createdBy: currentUser.uid };
      } else {
        updatedSchedule = [...scheduleList, { ...scheduleData, participantImage: imageUrl, createdBy: currentUser.uid }];
      }

      await updateDoc(docRef, { schedule: updatedSchedule });
      setScheduleList(updatedSchedule);
      toast.success(editingIndex !== null ? 'Schedule updated successfully!' : 'Schedule added successfully!');

      setScheduleData({ date: '', time: '', description: '', participants: '', opponent: '', participantImage: '' });
      setEditingIndex(null);
      setImageFile(null);
    } catch (err) {
      toast.error('Error updating schedule: ' + err.message);
    }
  };

  const handleEdit = (index) => {
    if (!currentUser) return;
    setScheduleData(scheduleList[index]);
    setEditingIndex(index);
  };

  const handleDelete = async (index) => {
    if (!currentUser) return;

    try {
      const docRef = doc(db, 'games', item.id);
      const updatedSchedule = scheduleList.filter((_, i) => i !== index);

      await updateDoc(docRef, { schedule: updatedSchedule });
      setScheduleList(updatedSchedule);
      toast.success('Schedule deleted successfully!');
    } catch (err) {
      toast.error('Error deleting schedule: ' + err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 sm:p-6">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full h-full max-w-full max-h-full overflow-y-auto lg:p-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-200">📅 Game Schedule</h2>

        <ul className="space-y-4 mb-6 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
          {scheduleList.length > 0 ? (
            scheduleList.map((entry, index) => (
              <li key={index} className="p-4 border-b border-gray-300 dark:border-gray-700 last:border-none bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-4">
                  {entry.participantImage && (
                    <img src={entry.participantImage} alt="Participant" className="w-14 h-14 rounded-full object-cover" />
                  )}
                  <div className="flex-1">
                    <span className="block font-semibold">{entry.date} - {entry.time}</span>
                    <div className="flex justify-around">
                      <span className="block">{entry.participants}</span>
                      <span className="font-semibold">vs</span>
                      <span className="block">{entry.opponent}</span>
                    </div>
                    <span className="block text-gray-600 dark:text-gray-400">{entry.description}</span>
                  </div>
                </div>

                {currentUser && (
                  <div className="flex justify-end space-x-3 mt-3">
                    <button
                      onClick={() => handleEdit(index)}
                      className="px-3 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-all flex items-center gap-2 text-sm"
                    >
                      <FaEdit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-3 py-2 bg-red-500 dark:bg-red-600 text-white rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition-all flex items-center gap-2 text-sm"
                    >
                      <FaTrash size={14} /> Delete
                    </button>
                  </div>
                )}
              </li>
            ))
          ) : (
            <li className="text-center text-gray-900 dark:text-gray-300">Not scheduled yet!</li>
          )}
        </ul>

        {currentUser && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="date" name="date" value={scheduleData.date} onChange={handleChange} className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-gray-300" />
              <input type="time" name="time" value={scheduleData.time} onChange={handleChange} className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-gray-300" />
              <input type="text" name="participants" value={scheduleData.participants} onChange={handleChange} placeholder="Participants" className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-gray-300" />
              <input type="text" name="opponent" value={scheduleData.opponent} onChange={handleChange} placeholder="Opponent" className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-gray-300" />
            </div>
            <textarea name="description" value={scheduleData.description} onChange={handleChange} placeholder="Description" rows="3" className="w-full px-3 py-2 border rounded-md my-4 resize-none dark:bg-gray-800 dark:text-gray-300" />
            <button onClick={handleSubmit} className="w-full px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-md hover:bg-green-700 dark:hover:bg-green-800 transition-all mt-4">
              {editingIndex !== null ? 'Update Schedule' : 'Add Schedule'}
            </button>
          </>
        )}

        <button onClick={onClose} className="w-full px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-md hover:bg-red-700 dark:hover:bg-red-800 transition-all mt-4">
          Close
        </button>
      </div>
    </div>
  );
}

export default SchedulePopup;

import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Firestore config file
import EventsCard from './EventsCard';

function Contest() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newGame, setNewGame] = useState({
    name: '',
    image: '',
    winners: {
      winnerName: '',
      score: ''
    },
    schedule: ''
  });

  // Fetch games from Firestore
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'games'));
        const games = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(games);
      } catch (err) {
        console.error('Error fetching games:', err);
        setError('Failed to load games. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Add a new game to Firestore
  const handleAddGame = async (e) => {
    e.preventDefault();
    if (!newGame.name || !newGame.image) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'games'), newGame);
      setItems([...items, { id: docRef.id, ...newGame }]);
      setNewGame({ name: '', image: '', winners: { winnerName: '', score: '' }, schedule: '' });
      setError(null);
    } catch (err) {
      console.error('Error adding game:', err);
      setError('Failed to add game. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Games List */}
      <div className="flex flex-wrap justify-center gap-4 mt-12">
        {loading && <p>Loading games...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && items.length === 0 && <p>No games available.</p>}
        {items.map((item) => (
          <EventsCard key={item.id} item={item} />
        ))}
      </div>

      {/* Add New Game Form */}
      <div className="mt-8">
        <form
          onSubmit={handleAddGame}
          className="flex flex-col gap-4 max-w-md mx-auto p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700"
        >
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Add a New Game</h2>
          <input
            type="text"
            placeholder="Game Name"
            value={newGame.name}
            onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
            className="p-2 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newGame.image}
            onChange={(e) => setNewGame({ ...newGame, image: e.target.value })}
            className="p-2 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="datetime-local"
            placeholder="Schedule"
            value={newGame.schedule}
            onChange={(e) => setNewGame({ ...newGame, schedule: e.target.value })}
            required
            className="p-2 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Add Game
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contest;


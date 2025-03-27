import { openDB } from 'idb';

const DB_NAME = 'playconDB';
const DB_VERSION = 1;
const USER_STORE = 'users';
const SCORE_STORE = 'scores';

// Initialize the database
async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(USER_STORE)) {
        db.createObjectStore(USER_STORE, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(SCORE_STORE)) {
        const scoreStore = db.createObjectStore(SCORE_STORE, { 
          keyPath: 'id', 
          autoIncrement: true 
        });
        // Create index for efficient game-based queries
        scoreStore.createIndex('game', 'game');
      }
    },
  });
}

// Base function for game-specific score queries
// async function getScoresByGame(game: 'memory' | 'trivia'): Promise<ScoreType[]> {
//   const db = await initDB();
//   const tx = db.transaction(SCORE_STORE, 'readonly');
//   const store = tx.objectStore(SCORE_STORE);
//   const index = store.index('game');
//   return index.getAll(game);
// }

async function getScoresByGame(game: 'memory' | 'trivia'): Promise<ScoreType[]> {
  const db = await initDB();
  try {
    // Get all scores from the store
    const allScores = await db.getAll(SCORE_STORE);
    
    // Filter scores by game type
    return allScores.filter(score => score?.game === game);
  } catch (error) {
    console.error('Error fetching scores:', error);
    return [];
  }
}

// Game-specific score getters
export async function getMemoryScores(): Promise<ScoreType[]> {
  return getScoresByGame('memory');
}

export async function getTriviaScores(): Promise<ScoreType[]> {
  return getScoresByGame('trivia');
}

// Add a user to the database
export async function addUser(user: User) {
  const db = await initDB();
  return db.add(USER_STORE, user);
}

// Get all users from the database
export async function getUsers() {
  const db = await initDB();
  return db.getAll(USER_STORE);
}

// Add a score to the database
export async function addScore(score: ScoreType) {
  const db = await initDB();
  return db.add(SCORE_STORE, score);
}

// Get all scores from the database
export async function getScores() {
  const db = await initDB();
  return db.getAll(SCORE_STORE);
}

// Save score function
export async function saveScore({ data, game }: { data: ScoreType; game: "trivia" | "memory" }) {
  try {
    const scoreData = { ...data, game };
    await addScore(scoreData);
    console.log('Score saved successfully!');
  } catch (error) {
    console.error('Error saving score:', error);
  }
}

export async function getAllUsers(): Promise<User[]> {
  const db = await initDB();
  return db.getAll(USER_STORE);
}

export async function getRaffleParticipants(): Promise<User[]> {
  try {
    const db = await initDB();
    return await db.getAll(USER_STORE);
  } catch (error) {
    console.error('Error fetching raffle participants:', error);
    return [];
  }
}
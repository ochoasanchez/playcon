// db.util.ts - Robust IndexedDB with fallbacks
import { openDB, DBSchema, IDBPDatabase } from 'idb';

// Types should be imported from your project
type User = {
  id?: number;
  name: string;
  company: string;
  level?: string;
};

type ScoreType = {
  id?: number;
  playerId?: number;
  playerName: string;
  playerCompany: string;
  scoreValue: number;
  scoreType: string;
  game: 'memory' | 'trivia';
};

const DB_NAME = 'playconDB';
const DB_VERSION = 2;
const USER_STORE = 'users';
const SCORE_STORE = 'scores';

interface PlayConDB extends DBSchema {
  users: {
    key: number;
    value: User;
    indexes: { 'by-name': string };
  };
  scores: {
    key: number;
    value: ScoreType;
    indexes: { 'by-game': string };
  };
}

// Feature detection
const supportsIndexedDB = (): boolean => 'indexedDB' in window;
const supportsWebSQL = (): boolean => 'openDatabase' in window;

// Polyfill loader using indexeddbshim
export const loadPolyfills = async (): Promise<void> => {
  if (!supportsIndexedDB()) {
    try {
      await import('indexeddbshim');
      console.log('IndexedDB polyfill loaded');
    } catch (error) {
      console.error('Failed to load IndexedDB polyfill:', error);
    }
  }
};

// Fallback to WebSQL or localStorage
class FallbackDB {
  static async getUsers(): Promise<User[]> {
    if (supportsWebSQL()) {
      return new Promise(resolve => {
        const db = window.openDatabase(DB_NAME, '1.0', 'Fallback DB', 5 * 1024 * 1024);
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM users',
            [],
            (_, { rows }) => resolve(Array.from(rows)),
            (_, error) => {
              console.error('WebSQL error:', error);
              resolve(FallbackDB.getLocalUsers());
            }
          );
        });
      });
    }
    return FallbackDB.getLocalUsers();
  }

  static async saveUser(user: User): Promise<void> {
    if (supportsWebSQL()) {
      return new Promise(resolve => {
        const db = window.openDatabase(DB_NAME, '1.0', 'Fallback DB', 5 * 1024 * 1024);
        db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO users (data) VALUES (?)',
            [JSON.stringify(user)],
            () => resolve(),
            (_, error) => {
              console.error('WebSQL error:', error);
              FallbackDB.saveLocalUser(user);
              resolve();
            }
          );
        });
      });
    }
    return FallbackDB.saveLocalUser(user);
  }

  private static getLocalUsers(): User[] {
    try {
      return JSON.parse(localStorage.getItem('users') || '[]');
    } catch {
      return [];
    }
  }

  private static saveLocalUser(user: User): void {
    const users = this.getLocalUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }
}

// Main database initialization with fallbacks
async function initDB(): Promise<IDBPDatabase<PlayConDB>> {
  try {
    if (!supportsIndexedDB()) {
      throw new Error('IndexedDB not supported');
    }

    return await openDB<PlayConDB>(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          const userStore = db.createObjectStore(USER_STORE, {
            keyPath: 'id',
            autoIncrement: true
          });
          userStore.createIndex('by-name', 'name');

          const scoreStore = db.createObjectStore(SCORE_STORE, {
            keyPath: 'id',
            autoIncrement: true
          });
          scoreStore.createIndex('by-game', 'game');
        }

        if (oldVersion < 2) {
          // Future migrations
        }
      },
      blocked() {
        console.warn('Database upgrade blocked');
      },
      blocking() {
        console.warn('Database needs upgrade');
      }
    });
  } catch (error) {
    console.error('IndexedDB init failed:', error);
    throw error;
  }
}

// Wrapped addUser with timeout support
const baseAddUser = async (user: User): Promise<void> => {
  try {
    const db = await initDB();
    await db.add(USER_STORE, user);
  } catch (error) {
    console.warn('IndexedDB add failed, using fallback');
    await FallbackDB.saveUser(user);
  }
};

// Android Nougat timeout wrapper
const addUserWithTimeout = (user: User): Promise<void> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Transaction timeout'));
    }, 4000);

    baseAddUser(user)
      .then(() => {
        clearTimeout(timeout);
        resolve();
      })
      .catch(error => {
        clearTimeout(timeout);
        reject(error);
      });
  });
};

// Export the appropriate version
export const addUser = /Android [7]/.test(navigator.userAgent) 
  ? addUserWithTimeout 
  : baseAddUser;

// Rest of your exports remain the same
export async function getUsers(): Promise<User[]> {
  try {
    const db = await initDB();
    return db.getAll(USER_STORE);
  } catch (error) {
    console.warn('IndexedDB get failed, using fallback');
    return FallbackDB.getUsers();
  }
}

export async function addScore(score: ScoreType): Promise<void> {
  try {
    const db = await initDB();
    await db.add(SCORE_STORE, score);
  } catch (error) {
    console.warn('Score save failed, using localStorage fallback');
    const scores = JSON.parse(localStorage.getItem('scores') || '[]');
    scores.push(score);
    localStorage.setItem('scores', JSON.stringify(scores));
  }
}

export async function getScoresByGame(game: 'memory' | 'trivia'): Promise<ScoreType[]> {
  try {
    const db = await initDB();
    if (db.transaction(SCORE_STORE).store.indexNames.contains('by-game')) {
      return db.getAllFromIndex(SCORE_STORE, 'by-game', game);
    }
    const allScores = await db.getAll(SCORE_STORE);
    return allScores.filter(s => s?.game === game);
  } catch (error) {
    console.warn('Score query failed, using fallback');
    const scores = JSON.parse(localStorage.getItem('scores') || '[]');
    return scores.filter((s: ScoreType) => s?.game === game);
  }
}

export const getMemoryScores = (): Promise<ScoreType[]> => getScoresByGame('memory');
export const getTriviaScores = (): Promise<ScoreType[]> => getScoresByGame('trivia');
export const getScores = getUsers;
export const getAllUsers = getUsers;
export const getRaffleParticipants = getUsers;

export async function saveScore({ data, game }: { data: Omit<ScoreType, 'game'>; game: 'trivia' | 'memory' }) {
  await addScore({ ...data, game });
}

// Android Nougat indexedDB.databases polyfill
if (/Android [7]/.test(navigator.userAgent)){
  if (window.indexedDB && !window.indexedDB.databases) {
    window.indexedDB.databases = (): Promise<any[]> => Promise.resolve([]);
  }
}
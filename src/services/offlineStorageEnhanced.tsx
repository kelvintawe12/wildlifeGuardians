import { Animal } from '../types/animal';
import { Quiz } from '../types/quiz';

interface PendingSync {
  id?: number;
  type: 'quiz_result' | 'user_progress' | 'badge_earned';
  data: any;
  token: string;
  timestamp: number;
}

class OfflineStorageService {
  private dbName = 'WildlifeGuardiansDB';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;

  // Initialize IndexedDB
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => {
        console.error('Failed to open IndexedDB:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('IndexedDB initialized successfully');
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores
        if (!db.objectStoreNames.contains('animals')) {
          db.createObjectStore('animals', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('quizzes')) {
          db.createObjectStore('quizzes', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('user_progress')) {
          db.createObjectStore('user_progress', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('quiz_results')) {
          db.createObjectStore('quiz_results', { keyPath: 'id', autoIncrement: true });
        }

        if (!db.objectStoreNames.contains('pending_sync')) {
          db.createObjectStore('pending_sync', { keyPath: 'id', autoIncrement: true });
        }

        if (!db.objectStoreNames.contains('app_settings')) {
          db.createObjectStore('app_settings', { keyPath: 'key' });
        }

        console.log('IndexedDB stores created');
      };
    });
  }

  // Generic method to store data
  async storeData(storeName: string, data: any): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Generic method to get data
  async getData(storeName: string, key?: any): Promise<any> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = key ? store.get(key) : store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Store animals data
  async storeAnimals(animals: Animal[]): Promise<void> {
    if (!this.db) await this.init();

    const transaction = this.db!.transaction(['animals'], 'readwrite');
    const store = transaction.objectStore('animals');

    for (const animal of animals) {
      store.put(animal);
    }

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        console.log('Animals stored offline');
        resolve();
      };
      transaction.onerror = () => reject(transaction.error);
    });
  }

  // Get animals data
  async getAnimals(): Promise<Animal[]> {
    return this.getData('animals') || [];
  }

  // Store quizzes data
  async storeQuizzes(quizzes: Quiz[]): Promise<void> {
    if (!this.db) await this.init();

    const transaction = this.db!.transaction(['quizzes'], 'readwrite');
    const store = transaction.objectStore('quizzes');

    for (const quiz of quizzes) {
      store.put(quiz);
    }

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        console.log('Quizzes stored offline');
        resolve();
      };
      transaction.onerror = () => reject(transaction.error);
    });
  }

  // Get quizzes data
  async getQuizzes(): Promise<Quiz[]> {
    return this.getData('quizzes') || [];
  }

  // Store quiz result for later sync
  async storeQuizResult(result: any, token: string): Promise<void> {
    const pendingData: PendingSync = {
      type: 'quiz_result',
      data: result,
      token,
      timestamp: Date.now()
    };

    await this.storeData('pending_sync', pendingData);
    console.log('Quiz result stored for offline sync');

    // Register background sync if available
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        // Check if sync is supported before registering
        if ('sync' in registration) {
          await (registration as any).sync.register('sync-quiz-results');
        }
      } catch (error) {
        console.log('Background sync registration failed:', error);
      }
    }
  }

  // Store user progress for later sync
  async storeUserProgress(progress: any, token: string): Promise<void> {
    const pendingData: PendingSync = {
      type: 'user_progress',
      data: progress,
      token,
      timestamp: Date.now()
    };

    await this.storeData('pending_sync', pendingData);
    console.log('User progress stored for offline sync');

    // Register background sync if available
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        // Check if sync is supported before registering
        if ('sync' in registration) {
          await (registration as any).sync.register('sync-user-progress');
        }
      } catch (error) {
        console.log('Background sync registration failed:', error);
      }
    }
  }

  // Get pending sync data
  async getPendingSync(): Promise<PendingSync[]> {
    return this.getData('pending_sync') || [];
  }

  // Clear synced data
  async clearSyncedData(id: number): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['pending_sync'], 'readwrite');
      const store = transaction.objectStore('pending_sync');
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Check if app is offline
  isOffline(): boolean {
    return !navigator.onLine;
  }

  // Store app settings
  async storeSetting(key: string, value: any): Promise<void> {
    await this.storeData('app_settings', { key, value, timestamp: Date.now() });
  }

  // Get app setting
  async getSetting(key: string): Promise<any> {
    const result = await this.getData('app_settings', key);
    return result?.value;
  }

  // Clear all offline data
  async clearAllData(): Promise<void> {
    if (!this.db) await this.init();

    const storeNames = ['animals', 'quizzes', 'user_progress', 'quiz_results', 'pending_sync'];
    
    for (const storeName of storeNames) {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      store.clear();
    }

    console.log('All offline data cleared');
  }

  // Get storage usage
  async getStorageUsage(): Promise<{ used: number; available: number }> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      return {
        used: estimate.usage || 0,
        available: estimate.quota || 0
      };
    }
    return { used: 0, available: 0 };
  }

  // Export data for backup
  async exportData(): Promise<string> {
    const animals = await this.getAnimals();
    const quizzes = await this.getQuizzes();
    const pendingSync = await this.getPendingSync();
    
    const exportData = {
      animals,
      quizzes,
      pendingSync,
      timestamp: Date.now(),
      version: this.dbVersion
    };

    return JSON.stringify(exportData, null, 2);
  }

  // Import data from backup
  async importData(jsonData: string): Promise<void> {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.animals) {
        await this.storeAnimals(data.animals);
      }
      
      if (data.quizzes) {
        await this.storeQuizzes(data.quizzes);
      }

      console.log('Data imported successfully');
    } catch (error) {
      console.error('Failed to import data:', error);
      throw error;
    }
  }
}

// Create singleton instance
export const offlineStorageService = new OfflineStorageService();

// Legacy functions for backward compatibility
export const saveQuizzesToLocalStorage = (quizzes: Quiz[]) => {
  offlineStorageService.storeQuizzes(quizzes);
};

export const getQuizzesFromLocalStorage = async (): Promise<Quiz[]> => {
  return await offlineStorageService.getQuizzes();
};

export const saveAnimalsToLocalStorage = (animals: Animal[]) => {
  offlineStorageService.storeAnimals(animals);
};

export const getAnimalsFromLocalStorage = async (): Promise<Animal[]> => {
  return await offlineStorageService.getAnimals();
};

export const saveUserDataToLocalStorage = (userData: any) => {
  offlineStorageService.storeData('user_progress', { id: 'current_user', ...userData });
};

export const getUserDataFromLocalStorage = async () => {
  return await offlineStorageService.getData('user_progress', 'current_user');
};

export const saveQuizResultToLocalStorage = (result: any) => {
  // For backward compatibility, store locally but also prepare for sync
  const token = localStorage.getItem('wildlife_auth_token') || '';
  offlineStorageService.storeQuizResult(result, token);
};

// Initialize on app load
if (typeof window !== 'undefined') {
  offlineStorageService.init().catch(console.error);
}

// Test credentials for demo
export const TEST_CREDENTIALS = {
  email: 'test@wildlifeguardians.com',
  password: 'wildlife123',
  name: 'Wildlife Test User'
};

// Demo animals data for offline mode
export const DEMO_ANIMALS: Animal[] = [
  {
    id: "1",
    name: "African Elephant",
    scientific_name: "Loxodonta africana",
    conservation_status: "Endangered",
    description: "Large mammals found in Africa, known for their intelligence and social behavior.",
    habitat: "Savanna, grasslands, forests",
    facts: [
      "Elephants can weigh up to 7000 kg",
      "They have excellent memory",
      "They live in matriarchal societies"
    ],
    threats: ["Poaching for ivory", "Habitat loss", "Human-wildlife conflict"],
    conservation_efforts: ["Anti-poaching patrols", "Habitat protection", "Community education"],
    image_url: "/images/elephant.jpg"
  },
  {
    id: "2",
    name: "Bengal Tiger",
    scientific_name: "Panthera tigris tigris",
    conservation_status: "Endangered",
    description: "The largest cat species and apex predator found in India and Bangladesh.",
    habitat: "Tropical forests, grasslands, mangroves",
    facts: [
      "Tigers are solitary animals",
      "They can leap up to 9 meters",
      "Each tiger has unique stripe patterns"
    ],
    threats: ["Habitat loss", "Poaching", "Human-wildlife conflict"],
    conservation_efforts: ["Protected reserves", "Anti-poaching units", "Corridor creation"],
    image_url: "/images/tiger.jpg"
  },
  {
    id: "3",
    name: "Mountain Gorilla",
    scientific_name: "Gorilla beringei beringei",
    conservation_status: "Critically Endangered",
    description: "Large primates found in the mountains of central Africa.",
    habitat: "Mountain forests",
    facts: [
      "Gorillas share 98% DNA with humans",
      "They live in family groups",
      "Adult males are called silverbacks"
    ],
    threats: ["Habitat loss", "Poaching", "Disease", "Civil unrest"],
    conservation_efforts: ["National parks", "Veterinary care", "Ecotourism", "Community involvement"],
    image_url: "/images/gorilla.jpg"
  }
];

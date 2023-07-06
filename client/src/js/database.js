const { openDB } = require('idb');

const initdb = async () => {
  try {
  const db = await openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }

      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('Jate DB created');
    },
  });
  return db;
  } catch (error) {
    console.error("Error initializing database: ");
    throw error;
  }
};

exports.putDb = async (content) => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    await store.put(content); // *await* the put() method
    await tx.done;
  } catch (error) {
    console.error("Error writing to database: ");
    throw error;
  }
};

exports.getDb = async () => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const content = await store.getAll();
    await tx.done;

    // Return the last item in the array of content if it exists, otherwise return undefined
    return content[content.length - 1]?.content;
  } catch (error) {
    console.error("Error reading from database: ");
    throw error;
  }
};

initdb();
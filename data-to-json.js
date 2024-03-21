const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
// Specify the path to your SQLite database file
const dbPath = '.tmp/data.db';
// Open SQLite database connection
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});
// Export data from SQLite table to JSON file
function exportToJson(tableName, jsonFilePath) {
  const query = `SELECT * FROM ${tableName}`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error querying data:', err.message);
    } else {
      // Write data to JSON file
      fs.writeFile(jsonFilePath, JSON.stringify(rows, null, 2), (err) => {
        if (err) {
          console.error('Error writing to JSON file:', err);
        } else {
          console.log(`Data exported to ${jsonFilePath} successfully.`);
        }
      });
    }
  });
}
const tableName = 'main_pages'; 
const jsonFilePath = 'data.json';
// Call exportToJson function
exportToJson(tableName, jsonFilePath);
// Close the SQLite database connection
db.close((err) => {
  if (err) {
    console.error('Error closing database:', err.message);
  } else {
    console.log('Disconnected from the SQLite database.');
  }
});

// to run this:
// node data-to-json.js
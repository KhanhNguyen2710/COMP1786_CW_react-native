import * as SQLite from "expo-sqlite";

const database_name = "TodoApp.db";
const database_version = "1.0";
const database_displayname = "Todo App Database";
const database_size = 200000;

const db = SQLite.openDatabase(
  database_name,
  database_version,
  database_displayname,
  database_size
);

const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        location TEXT,
        date DATE,
        parking TEXT,
        length INTEGER,
        level TEXT,
        des TEXT
      );`,
      [],
      () => console.log("Database and table created successfully."),
      (error) => console.log("Error occurred while creating the table.", error)
    );
  });
};

// const initDatabase = () => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       "DROP TABLE IF EXISTS todos;",
//       [],
//       () => {
//         console.log("Table dropped successfully.");
//         createTable(tx); // Call a function to create the table after dropping
//       },
//       (error) => console.log("Error occurred while dropping the table.", error)
//     );
//   });
// };
// const createTable = (tx) => {
//   tx.executeSql(
//     `CREATE TABLE IF NOT EXISTS todos (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT,
//         location TEXT,
//         date DATE,
//         parking TEXT,
//         length INTEGER,
//         level TEXT,
//         des TEXT
//     );`,
//     [],
//     () => console.log("Database and table created successfully."),
//     (error) => console.log("Error occurred while creating the table.", error)
//   );
// };

const getTodos = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM todos",
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const deleteTodo = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM todos WHERE id = ?",
        [id],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const deleteAllTodo = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `DELETE FROM todos`,
      [],
      () => console.log("Delete Successfully"),
      (error) => console.log("Error Deleteed.", error)
    );
  });
};

const addTodo = (name, location, date, parking, length, level, des) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO todos (name, location, date, parking, length, level, des) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, location, date, parking, length, level, des],
        (_, { insertId }) => {
          resolve(insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const searchTodos = (searchText) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM todos WHERE name LIKE ? OR location LIKE ?",
        [`%${searchText}%`, `%${searchText}%`], // Use % for wildcard matching
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};


const updateTodo = (id, name, location, date, parking, length, level, des) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE todos SET name = ?, location = ?, date = ?, parking = ?, length = ?, level = ?, des = ? WHERE id = ?`,
        [name, location, date, parking, length, level, des, id],
        (_, { updateId }) => {
          resolve(updateId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};


const Database = {
  initDatabase,
  addTodo,
  getTodos,
  deleteTodo,
  searchTodos,
  updateTodo,
  deleteAllTodo,
};

export default Database;

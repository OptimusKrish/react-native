import { SQLite } from 'expo';

const DBUtils = {

    errorHandler: (err) => {
        console.log(err);
    },

    insert: (data) => {
        return new Promise((res, rej) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO expenses (Date, Category, Amount, expTimestamp, Timestamp) VALUES (?, ?, ?, ?, ?)', [data.d, data.cat, data.amt, data.expTimestamp, data.timestamp]
                );
            }, (err) => { 
                rej(DBUtils.errorHandler(err));
            }, () => {
                res(true);
            });
        });
    },

    select: () => {
        return new Promise((res, rej) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM expenses ORDER BY expTimestamp DESC, Timestamp ASC', [], (_, { rows }) => {
                    res(JSON.stringify(rows))
                });
            }, (err) => { 
                rej(DBUtils.errorHandler(err));
            });
        });
    },

    create: () => {
        return new Promise((res, rej) => {
            db.transaction((tx) => {
                // tx.executeSql('DROP TABLE expenses');
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS expenses (ID INTEGER PRIMARY KEY NOT NULL, Date TEXT NOT NULL, Category TEXT, Amount INT NOT NULL, expTimestamp INT NOT NULL, Timestamp INT NOT NULL)'
                );
            }, (err) => {
                rej(DBUtils.errorHandler(err));
            }, () => {
                res(true);
            });
        });
    }
}

const db = SQLite.openDatabase('myMoney.db');

export {
    DBUtils
}
import SQLite from "react-native-sqlite-storage";

SQLite.enablePromise(true);
export default function getSQLite() {
  return SQLite.openDatabase({name: 'SQLITE', location: 'default'});
}

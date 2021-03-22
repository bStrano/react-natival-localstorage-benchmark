import { openDatabase } from "react-native-sqlite-storage";

export default function getSQLite() {
  return openDatabase({name: 'SQLITE', location: 'default'});
}

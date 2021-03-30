import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { schema } from "../models/watermelon/schema";
import SimulationDataWatermelon from "../models/watermelon/SimulationDataWatermelon";
import SimulationData2Watermelon from "../models/watermelon/SimulationData2Watermelon";

// import Post from './model/Post' // ⬅️ You'll import your Models here

// First, create the adapter to the underlying database:

// @ts-ignore
const adapter = new SQLiteAdapter({
  schema,
  // optional database name or file system path
  // dbName: 'myapp',
  // optional migrations
  // migrations,
  // synchronous mode only works on iOS. improves performance and reduces glitches in most cases, but also has some downsides - test with and without it
  synchronous: true,
  // experimental JSI mode, a more advanced version of synchronous: true
  // experimentalUseJSI: true,
  // Optional, but you should implement this method:
  onSetUpError: error => {
    console.error(error);
  },
});

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [SimulationDataWatermelon, SimulationData2Watermelon],
  actionsEnabled: true,
});

export default database;

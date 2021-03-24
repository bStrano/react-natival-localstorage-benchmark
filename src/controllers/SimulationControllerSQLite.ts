import SimulationController from "./SimulationController";
import getSQLite from "../configs/SQLiteDB";
import ISimulationDataSQLite from "../interfaces/ISimulationDataSQLite";
import DatabasesEnum from "../constants/Databases";

class SimulationControllerSQLite extends SimulationController {
  constructor() {
    super();
  }
  getDatabaseName(): DatabasesEnum {
    return DatabasesEnum.SQLITE;
  }

  async createEnvironment(): Promise<void> {
    const db = await getSQLite();
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(
            `
        CREATE TABLE IF NOT EXISTS SIMULATION(
          id INTEGER PRIMARY KEY NOT NULL,
          number REAL,
          string TEXT,
          timestamp TEXT,
           simulation2_id INTEGER,
          FOREIGN KEY(simulation2_id) REFERENCES SIMULATION2(id)
        )
      `,
          ),
            tx.executeSql(
              `
        CREATE TABLE IF NOT EXISTS SIMULATION2(
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT
        )
      `,
            ),
            tx.executeSql(
              `
        CREATE TABLE IF NOT EXISTS SIMULATION3(
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT
        )
      `,
            );
          tx.executeSql(
            `
       DELETE FROM SIMULATION;
       DELETE FROM SIMULATION2;
       DELETE FROM SIMULATION3;
      `,
          );
          tx.executeSql(
            `
   
       DELETE FROM SIMULATION2;
      `,
          );
        },
        error => reject(error),
        success => resolve(),
      );
    });
  }

  async selectAll(): Promise<void> {
    const db = await getSQLite();

    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          console.time('SELECT');
          tx.executeSql(
            'SELECT * FROM Simulation  ORDER BY number',
            [],
            (tx, results) => {
              let data = [];
              for (let i = 0; i < results.rows.length; i++) {
                const item = results.rows.item(i);
                data.push(i);
              }

              console.log('OK', data.length);
            },
            error => console.log('Get Clientes' + error),
          );
        },
        err => reject(err),
        () => resolve(),
      );
    });
  }

  async selectAllWithJoin(): Promise<void> {
    const db = await getSQLite();
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          console.time('SELECTJOIN');
          tx.executeSql(
            'SELECT * FROM Simulation  LEFT JOIN SIMULATION2 on SIMULATION.simulation2_id = SIMULATION2.id ORDER BY number',
            [],
            (tx, results) => {
              let data = [];
              for (let i = 0; i < results.rows.length; i++) {
                const item = results.rows.item(i);
                data.push(i);
              }

              console.log('OK', data.length);
            },
            error => console.log(error),
          );
        },
        err => reject(err),
        () => resolve(),
      );
    });
  }
  arrayToVALUES(array: ISimulationDataSQLite[]) {
    if (array.length === 0) {
      return '';
    }
    let values = '';
    let size = 500;
    if (size < 1) {
      return values;
    }

    let results = [];
    let resultsValues = [] as string[];
    while (array.length) {
      results.push(array.splice(0, size));
    }

    results.forEach(item => {
      values = '';
      item.forEach((item, index, array) => {
        let value = item.getValues();
        values = values + value;
        if (index !== array.length - 1) {
          values = values + ',';
        }
      });

      resultsValues.push(values);
    });
    return resultsValues;
  }

  async insertAll(data: any[], data2: any[]): Promise<void> {
    const db = await getSQLite();
    let values = this.arrayToVALUES(data) as string[];
    let values2 = this.arrayToVALUES(data2) as string[];

    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          console.time('INSERT');
          values.forEach(item => {
            tx.executeSql(
              `
          INSERT INTO SIMULATION(number,string,timestamp,simulation2_id) VALUES ${item}
      `,
            );
          });
          values2.forEach(item => {
            tx.executeSql(
              `
          INSERT INTO SIMULATION2(name) VALUES ${item}
      `,
            );
          });
        },
        error => reject(error),
        () => {
          resolve();
        },
      );
    });
  }
}

export default SimulationControllerSQLite;

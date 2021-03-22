import SimulationController from "./SimulationController";
import getSQLite from "../configs/SQLiteDB";
import ISimulationDataSQLite from "../interfaces/ISimulationDataSQLite";
import DatabasesEnum from "../constants/Databases";

class SimulationControllerSQLite extends SimulationController {
  static createEnvironment(): void {
    const db = getSQLite();
    db.transaction(tx => {
      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS SIMULATION(
          id INTEGER PRIMARY KEY NOT NULL,
          number REAL,
          string TEXT,
          timestamp TEXT
        )
      `,
      ),
        tx.executeSql(
          `
        CREATE TABLE IF NOT EXISTS SIMULATION(
          id INTEGER PRIMARY KEY NOT NULL,
          number REAL,
          string TEXT,
          timestamp TEXT
           simulation2_id INTEGER
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
    });
  }

  static selectAll() {
    const db = getSQLite();
    db.transaction(
      tx => {
        console.time('SELECT');
        tx.executeSql(
          'SELECT * FROM Simulation  ORDER BY number',
          null,
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
      err => console.error(err),
      () => console.timeEnd('SELECT'),
    );

    db.transaction(
      tx => {
        console.time('SELECTJOIN');
        tx.executeSql(
          'SELECT * FROM Simulation  LEFT JOIN SIMULATION2 on SIMULATION.id = SIMULATION2.simulation_id  ORDER BY' +
            ' number',
          null,
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
      err => console.error(err),
      () => console.timeEnd('SELECTJOIN'),
    );
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
    let resultsValues = [];
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
    console.log('RESILTS VALUES', resultsValues.length);
    return resultsValues;
  }

  createEnvironment(): void {}

  getDatabaseName(): DatabasesEnum {
    return DatabasesEnum.SQLITE;
  }

  selectAll(data: []): void {}

  insertAll(data: any[], data2: any[]): void {
    const db = getSQLite();
    let values = this.arrayToVALUES(data);
    let values2 = this.arrayToVALUES(data2);
    db.transaction(
      tx => {
        console.time('INSERT');
        values.forEach(item => {
          tx.executeSql(
            `
          INSERT INTO SIMULATION(id,number,string,timestamp) VALUES ${item}
      `,
          );
        });
        values2.forEach(item => {
          tx.executeSql(
            `
          INSERT INTO SIMULATION2(id,simulation_id) VALUES ${item}
      `,
          );
        });
      },
      error => console.error('Falha ao inserir', error),
      () => {
        console.timeEnd('INSERT');
        console.log('SELECT');
        SimulationControllerSQLite.selectAll();
      },
    );
  }
}

export default SimulationControllerSQLite;

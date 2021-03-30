interface ISimulation2Constructor {
  id?: number | ObjectId;
  name?: string;
}

class SimulationData2 {
  _id?: number | ObjectId;
  name?: string;

  constructor({id, name}: ISimulation2Constructor) {
    this._id = id;
    this.name = name;
  }

  toJSON() {
    return {
      _id: this._id,
      name: this.name,
    };
  }
}

export default SimulationData2;

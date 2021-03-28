interface ISimulation2Constructor {
  id?: number | ObjectId;
  name?: string;
}

class SimulationData2 {
  private readonly _id?: number | ObjectId;
  name?: string;

  constructor({id, name}: ISimulation2Constructor) {
    this._id = id;
    this.name = name;
  }

  get id(): number | ObjectId {
    return this._id;
  }

  toJSON() {
    return {
      _id: this._id,
      name: this.name,
    };
  }
}

export default SimulationData2;

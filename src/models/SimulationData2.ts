interface ISimulation2Constructor {
  id?: number;
  name: string;
}

class SimulationData2 {
  private readonly _id?: number;
  private readonly _name?: string;

  constructor({id, name}: ISimulation2Constructor) {
    this._id = id;
    this._name = name;
  }

  get id(): number | undefined {
    return this._id;
  }

  get name(): string | undefined {
    return this._name;
  }
}

export default SimulationData2;

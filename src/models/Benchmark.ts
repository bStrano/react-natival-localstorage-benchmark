interface IBenchmarkData {
  start: number;
  final: number;
}

class Benchmark {
  insert = {
    start: 0,
    final: 0,
  };
  select = {
    start: 0,
    final: 0,
  };
  selectRelation = {
    start: 0,
    final: 0,
  };

  getInsertPerformance() {
    return Benchmark.getPerformance(this.insert);
  }

  getSelectPerformance() {
    return Benchmark.getPerformance(this.select);
  }

  getSelectRelation() {
    return Benchmark.getPerformance(this.selectRelation);
  }

  private static getPerformance(object: IBenchmarkData) {
    if (object.start > object.final) {
      return 0;
    }
    return object.final - object.start;
  }
}

export default Benchmark;

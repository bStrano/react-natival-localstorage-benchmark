class RandomUtil {
  static getRandomString() {
    return Math.random().toString(36).slice(2);
  }
}

export default RandomUtil;

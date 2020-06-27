export default class Importer {
  private queue: string[];

  load(filePath: string | string[]) {
    if (Array.isArray(filePath)) {
    } else {
      this.queue.push(filePath);
    }
  }
}

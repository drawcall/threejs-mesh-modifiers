export class Log {
  private static index = 0;

  public static log(time: number, msg: any) {
    this.index++;
    if (this.index < time) {
      console.log(msg);
    }
  }
}

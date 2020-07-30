export class Dictionary {
  private dic: any = {};

  setVal(obj: any, val: any) {
    let key: string = this.getKey(obj);
    this.dic[key] = val;
  }

  getVal(obj: any) {
    let key: string = this.getKey(obj);
    return this.dic[key];
  }

  private getKey(obj: any): string {
    if (typeof obj == "object") {
      if (obj.id) {
        return obj.id;
      } else {
        let id: string = "d_" + Math.floor(Math.random() * Math.pow(10, 10));
        obj.id = id;
        return id;
      }
    } else {
      return obj + "";
    }
  }
}

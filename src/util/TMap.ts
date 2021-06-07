class Item {
  public value: string;
  public to: number;
  public from: number[] = [];

  public push(v: number): void {
    this.from.push(v);
  }
}

export class TMap {
  private _map: {
    [propName: string]: Item;
  };

  constructor() {
    this._map = {};
  }

  add(to: number, from: number, value: string) {
    let key: string = `t_${to}`;
    if (!this._map[key]) this._map[key] = new Item();
    this._map[key].push(from);
    this._map[key].to = to;
    this._map[key].value = value;
  }

  getToByValue(value: string): number {
    let item: Item = this.getItemByValue(value);
    return item ? item.to : -1;
  }

  getFromByTo(to: number): number[] {
    let item: Item = this.getItemByTo(to);
    return item ? item.from : null;
  }

  includeByValue(value: string): boolean {
    let item: Item = this.getItemByValue(value);
    return !!item;
  }

  getItemByValue(value: string): Item {
    for (let key in this._map) {
      let item = this._map[key];
      if (item.value === value) return item;
    }
    return null;
  }

  getItemByTo(to: number): Item {
    let key: string = `t_${to}`;
    return this._map[key];
  }

  public destroy(): void {
    for (let key in this._map) {
      delete this._map[key];
    }
  }
}

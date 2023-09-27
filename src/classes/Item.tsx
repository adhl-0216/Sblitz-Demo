export class Item {
  id?: string;
  name: string;
  quantity: number;
  price: number;
  type: string;

  constructor(name: string, quantity: number, price: number, type: string) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.type = type;
  }
}

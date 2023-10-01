import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { Member } from "./Member";

export class Item {
  id?: string;
  name: string;
  quantity: number;
  price: number;
  type: Member | string;

  constructor(name: string, quantity: number, price: number, type: Member) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.type = type;
  }

  public static async updateItem(item: Item, listName: string, uid: string) {
    const docRef = doc(db, uid, listName, "Items", item.id!);
    const updateFields = {
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      type: item.type,
    };
    await updateDoc(docRef, updateFields);
    console.log("updated : " + item.id);
  }

  public static async delete(id: string, listName: string, uid: string) {
    deleteDoc(doc(db, uid, listName, "Items", id));
  }
}

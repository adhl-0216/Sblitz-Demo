import { db } from "../FirebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";

export class Member {
  id?: string;
  name: string;
  color: string;
  balance: number;
  key?: string;

  constructor(name: string, color: string) {
    this.key = crypto.randomUUID();
    this.name = name;
    this.color = color;
    this.balance = 0;
  }

  [Symbol.iterator]() {
    return {
      next: this._next.bind(this),
    };
  }

  private _next(): IteratorResult<Member> {
    return { value: this, done: true };
  }

  public static deleteMember(uid: string, listName: string, id: string): void {
    deleteDoc(doc(db, uid, listName, "Members", id));
  }
}

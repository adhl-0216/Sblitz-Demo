import { AiFillEdit } from "react-icons/ai";
import { Item } from "../App";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

interface Props {
  user: User;
  listName: string;
}

const List = ({ listName, user }: Props) => {
  if (listName === "") return <></>;
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    let ignore = false;

    const getItems = async () => {
      const itemsColRef = collection(db, user.uid, listName, "Items");
      const qSnap = await getDocs(itemsColRef);

      if (!ignore) {
        qSnap.forEach((doc) => {
          console.log(doc.data());
          const item = doc.data();
          const newItem: Item = {
            name: item["name"],
            quantity: item["quantity"],
            price: item["price"],
            type: item["type"],
          };
          setItems((curr) => [...curr, newItem]);
        });
      }
    };
    setItems([]);
    getItems();
    return () => {
      ignore = true;
    };
  }, [listName]);

  return (
    <>
      <div>
        <h2>Items</h2>
        <ul>
          {items.map((item) => {
            return (
              <li className="d-inline-flex p-2" key={crypto.randomUUID()}>
                <input
                  type="text"
                  className="form-control"
                  value={item.name}
                  disabled
                ></input>
                <label className="form-label p-2">Price(&euro;)</label>
                <input
                  type="text"
                  className="form-control"
                  value={item.price}
                  disabled
                ></input>
                <label className="form-label p-2">Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  value={item.quantity}
                  disabled
                ></input>
                <label className="form-label p-2">Type</label>
                <input
                  type="text"
                  className="form-control"
                  value={item.type}
                  disabled
                ></input>

                <div>
                  <button className="btn" onClick={() => console.log("edit")}>
                    <AiFillEdit></AiFillEdit>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default List;

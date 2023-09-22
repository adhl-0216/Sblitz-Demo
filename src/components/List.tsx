import { Item } from "../App";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import ListItem from "./ListItem";

interface Props {
  user: User;
  selectedList: string;
}

const List = ({ selectedList, user }: Props) => {
  const [posted, setPosted] = useState(false);

  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    let ignore = false;

    const getItems = async () => {
      const itemsColRef = collection(db, user.uid, selectedList, "Items");
      const qSnap = await getDocs(itemsColRef);

      if (!ignore) {
        qSnap.forEach((doc) => {
          console.log(doc.data());
          const item = doc.data();
          const newItem = {
            docId: doc.id,
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
  }, [selectedList]);

  return (
    <>
      <div>
        <h2>{selectedList}</h2>
        {items.length == 0 && "No items."}
        <ul>
          {items.map((item) => {
            return (
              <ListItem
                item={item}
                key={item["id"]}
                selectedList={selectedList}
                onPosted={setPosted}
              ></ListItem>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default List;

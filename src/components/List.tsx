import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";
import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  selectedList: string;
  itemAdded: boolean;
}

const List = ({ selectedList, itemAdded }: Props) => {
  if (selectedList == "") return;
  const [posted, setPosted] = useState(false);
  const [user] = useAuthState(auth);

  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    let ignore = false;

    const getItems = async () => {
      const itemsColRef = collection(db, user!.uid, selectedList, "Items");
      const qSnap = await getDocs(itemsColRef);

      if (!ignore) {
        qSnap.forEach((doc) => {
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
  }, [selectedList, itemAdded]);

  return (
    <>
      {items.length == 0 && "No items."}
      {items.map((item) => {
        return (
          <div key={item["docId"]} className="card">
            <ListItem
              item={item}
              selectedList={selectedList}
              onPosted={setPosted}
            ></ListItem>
          </div>
        );
      })}
    </>
  );
};

export default List;

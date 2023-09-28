import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";
import { useEffect, useState } from "react";
import ListItem from "./ManageItems/ListItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { Member } from "../classes/Member";
import ListMembers from "./ManageMembers/ListMembers";
import ModalAddMember from "./ManageMembers/ModalAddMember";
import { Item } from "../classes/Item";

interface Props {
  selectedList: string;
  itemAdded: boolean;
  allMembers: Member[];
  allItems: Item[];
  setAllItems: (params?: any) => void;
}

const List = ({
  selectedList,
  itemAdded,
  allMembers,
  allItems,
  setAllItems,
}: Props) => {
  if (selectedList == "") return;
  const [posted, setPosted] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    let ignore = false;

    const getItems = async () => {
      const itemsColRef = collection(db, user!.uid, selectedList, "Items");
      const qSnap = await getDocs(itemsColRef);

      if (!ignore) {
        setAllItems([]);
        qSnap.forEach((doc) => {
          const newItem = doc.data() as Item;
          newItem.id = doc.id;

          setAllItems((curr: Item[]) => [...curr, newItem]);
        });
      }
    };
    getItems();
    return () => {
      ignore = true;
    };
  }, [selectedList, itemAdded]);

  return (
    <div className="container m-3">
      {allItems.length == 0 && "No items."}
      {allItems.map((item) => {
        return (
          <ListItem
            item={item}
            selectedList={selectedList}
            allMembers={allMembers}
            onPosted={setPosted}
            key={item.id}
          ></ListItem>
        );
      })}
    </div>
  );
};

export default List;

import List from "./List";
import AllListSelector from "./AllListSelector";
import CreateList from "./CreateList";
import SignOut from "./SignOut";
import AddItem from "./ManageItems/AddItem";

import { Stack } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Member } from "../classes/Member";
import { collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import ListMembers from "./ManageMembers/ListMembers";
import ModalAddMember from "./ManageMembers/ModalAddMember";

const MainUI = () => {
  const [user] = useAuthState(auth);

  const [allLists, setAllLists] = useState<string[]>([]);
  const [allMembers, setAllMembers] = useState<Member[]>([]);
  const [selectedList, setselectedList] = useState<string>("");

  const [itemAdded, setItemAdded] = useState(false);

  useEffect(() => {
    let ignore = false;
    const fetchMembers = async () => {
      if (selectedList == "") return;
      const uid = user!.uid;
      const membersColRef = collection(db, uid, selectedList, "Members");
      const qSnap = await getDocs(query(membersColRef));
      setAllMembers([]);

      if (!ignore) {
        qSnap.forEach((doc) => {
          const newMember = doc.data() as Member;
          newMember.id = doc.id;
          setAllMembers((curr) => [...curr, newMember]);
        });
      }
    };

    fetchMembers();

    return () => {
      ignore = true;
    };
  }, [selectedList]);

  return (
    <div className="container m-5">
      <Stack direction="horizontal" gap={3}>
        <AllListSelector
          allLists={allLists}
          setAllLists={setAllLists}
          setAllMembers={setAllMembers}
          onSelect={setselectedList}
        ></AllListSelector>
        <CreateList
          allLists={allLists}
          setSelectedList={setselectedList}
          allMembers={allMembers}
          setAllMembers={setAllMembers}
        ></CreateList>
        <SignOut className="ms-auto"></SignOut>
      </Stack>
      <hr></hr>

      {selectedList != "" ? (
        <div className="container md-3">
          <h2>{selectedList}</h2>
          <div className="d-flex">
            <ListMembers
              allMembers={allMembers}
              setAllMembers={setAllMembers}
              selectedList={selectedList}
            ></ListMembers>
            <ModalAddMember
              selectedList={selectedList}
              allMembers={allMembers}
              setAllMembers={setAllMembers}
            ></ModalAddMember>
          </div>

          <AddItem
            allMembers={allMembers}
            selectedList={selectedList}
            onAdd={setItemAdded}
          ></AddItem>

          <List
            selectedList={selectedList}
            itemAdded={itemAdded}
            allMembers={allMembers}
            setAllMembers={setAllMembers}
          ></List>
        </div>
      ) : (
        <h2>Select a list to begin!</h2>
      )}
    </div>
  );
};

export default MainUI;

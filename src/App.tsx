import { useState } from "react";
import AddItem from "./components/AddItem";
import SignUp from "./components/SignUp";
import SignOut from "./components/SignOut";
import { auth } from "./FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import List from "./components/List";
import ListSelector from "./components/ListSelector";
import CreateList from "./components/CreateList";
import { Stack } from "react-bootstrap";
import ListMembers from "./components/ListMembers";

export interface Item {
  name: string;
  quantity: number;
  price: number;
  type: string;
}

const App = () => {
  const [allLists, setAllLists] = useState<string[]>([]);
  const [allMembers, setAllMembers] = useState<string[]>([]);
  const [selectedList, setselectedList] = useState<string>("");

  const [itemAdded, setItemAdded] = useState(false);

  const [user] = useAuthState(auth);

  return (
    <>
      {!user ? (
        <SignUp></SignUp>
      ) : (
        <div className="container m-5">
          <Stack direction="horizontal" gap={3}>
            <ListSelector
              allLists={allLists}
              setAllLists={setAllLists}
              setAllMembers={setAllMembers}
              onSelect={setselectedList}
            ></ListSelector>
            <CreateList
              allLists={allLists}
              setSelectedList={setselectedList}
              allMembers={allMembers}
              setAllMembers={setAllMembers}
            ></CreateList>
            <SignOut className="ms-auto"></SignOut>
          </Stack>
          {selectedList != "" && (
            <div className="container md-3">
              <AddItem
                allMembers={allMembers}
                selectedList={selectedList}
                onAdd={setItemAdded}
              ></AddItem>
              <hr></hr>
              <h2>{selectedList}</h2>

              <ListMembers selectedList={selectedList}></ListMembers>
              <List selectedList={selectedList} itemAdded={itemAdded}></List>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default App;

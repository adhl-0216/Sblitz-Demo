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

export interface Item {
  name: string;
  quantity: number;
  price: number;
  type: string;
}

const App = () => {
  const [allLists, setAllLists] = useState<string[]>([]);

  const [selectedList, setselectedList] = useState<string>("");
  const [user] = useAuthState(auth);
  const [showApp, setShowApp] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const handleSelect = (params: any) => {
    setselectedList(params);
  };

  const handleAdd = (param?: any) => {
    setRefresh(true);
  };

  const handleCreate = (params?: any) => {
    setselectedList(params);
  };

  return (
    <>
      {!user ? (
        <SignUp></SignUp>
      ) : (
        <div className="container m-5">
          <Stack direction="horizontal" gap={3}>
            <ListSelector
              user={user}
              allLists={allLists}
              setAllLists={setAllLists}
              onSelect={handleSelect}
            ></ListSelector>
            <CreateList
              allLists={allLists}
              onCreate={setselectedList}
            ></CreateList>
            <SignOut className="ms-auto"></SignOut>
          </Stack>
          {showApp && (
            <div className="container md-3">
              <AddItem
                user={user}
                selectedList={selectedList}
                onAdd={handleAdd}
              ></AddItem>

              <List user={user} selectedList={selectedList}></List>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default App;

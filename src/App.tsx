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
  const [listName, setListName] = useState<string>("");
  const [user] = useAuthState(auth);
  const [showApp, setShowApp] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const handleSelect = (params: any) => {
    setListName(params);
  };

  const handleAdd = (param?: any) => {
    setRefresh(true);
  };

  const handleCreate = (params?: any) => {
    setListName(params);
  };

  return (
    <>
      {!user ? (
        <SignUp></SignUp>
      ) : (
        <>
          <Stack
            direction="horizontal"
            gap={1}
            className="d-flex container md-3 pt-5"
          >
            <ListSelector user={user} onSelect={handleSelect}></ListSelector>
            <CreateList
              listName={listName}
              onCreate={handleCreate}
            ></CreateList>
          </Stack>
          {showApp && (
            <div className="container md-3">
              <AddItem
                user={user}
                listName={listName}
                onAdd={handleAdd}
              ></AddItem>

              <List user={user} listName={listName}></List>

              <SignOut></SignOut>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default App;

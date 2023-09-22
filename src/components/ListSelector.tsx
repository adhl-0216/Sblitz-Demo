import { User } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

interface Props {
  user: User;
  onSelect: (params?: any) => void;
  allLists: string[];
  setAllLists: (params?: any) => void;
}

const ListSelector = ({ user, onSelect, allLists, setAllLists }: Props) => {
  const isLoaded = useRef(false);

  useEffect(() => {
    if (!isLoaded.current) {
      isLoaded.current = true;
      getLists();
    }
  }, [isLoaded]);

  const getLists = async () => {
    const qSnap = await getDocs(collection(db, user.uid));
    qSnap.forEach((list) => {
      setAllLists((curr: string) => [...curr, list.id]);
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const anchor = e.target as HTMLAnchorElement;
    onSelect(anchor.innerHTML);
  };

  return (
    <>
      <DropdownButton title={"Select List"}>
        {allLists.map((list) => {
          return (
            <Dropdown.Item key={list} onClick={handleClick}>
              {list}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </>
  );
};

export default ListSelector;

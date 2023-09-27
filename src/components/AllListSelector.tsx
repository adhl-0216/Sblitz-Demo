import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Member } from "../classes/Member";

interface Props {
  onSelect: (params?: any) => void;
  allLists: string[];
  setAllLists: (params?: any) => void;
  setAllMembers: (params: Member[]) => void;
}

const AllListSelector = ({
  onSelect,
  allLists,
  setAllLists,
  setAllMembers,
}: Props) => {
  const [user] = useAuthState(auth);

  const isLoaded = useRef(false);

  useEffect(() => {
    if (!isLoaded.current) {
      isLoaded.current = true;
      fetchLists();
    }
  }, [isLoaded]);

  const fetchLists = async () => {
    const qSnap = await getDocs(collection(db, user!.uid));
    qSnap.forEach((doc) => {
      setAllLists((curr: string) => [...curr, doc.id]);
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const anchor = e.target as HTMLAnchorElement;
    const listName = anchor.innerHTML;

    onSelect(listName);
  };

  const renderOptions = () => {
    return allLists.map((list) => {
      return (
        <Dropdown.Item key={list} onClick={handleClick}>
          {list}
        </Dropdown.Item>
      );
    });
  };

  return (
    <>
      <DropdownButton title={"Select List"}>{renderOptions()}</DropdownButton>
    </>
  );
};

export default AllListSelector;

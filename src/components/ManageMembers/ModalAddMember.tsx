import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { HiUserAdd } from "react-icons/hi";
import AddMember from "./AddMember";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../FirebaseConfig";
import { Member } from "../../classes/Member";
import ListMembers from "./ListMembers";

interface Props {
  selectedList: string;
  allMembers: Member[];
  setAllMembers: (membersList: any) => void;
}

const ModalAddMember = ({ selectedList, allMembers, setAllMembers }: Props) => {
  const [user] = useAuthState(auth);

  const membersRef = collection(db, user!.uid, selectedList, "Members");

  const [updateMembersList, setUpdateMembersList] = useState<Member[]>([]);

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow((curr) => !curr);
  };

  const removeMember = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    console.log(allMembers);
    const result = allMembers.filter((member) => {
      member.id != button.value;
    });
    console.log(result);
  };

  const updateMembers = () => {
    setAllMembers((curr: Member[]) => {
      return [...curr, ...updateMembersList];
    });

    updateMembersList.map((member) => {
      const data = {
        name: member.name,
        color: member.color,
        balance: member.balance,
        key: member.key,
      };
      addDoc(membersRef, data).then((docRef) => {
        member.id = docRef.id;
      });
    });

    handleShow();
  };
  return (
    <div>
      <Button
        variant="primary"
        className="mx-auto text-center"
        onClick={handleShow}
      >
        <HiUserAdd></HiUserAdd>
      </Button>
      <Modal show={show} onHide={handleShow} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddMember
            updateMembersList={updateMembersList}
            setUpdateMembersList={setUpdateMembersList}
          ></AddMember>
          <ListMembers
            allMembers={updateMembersList}
            setAllMembers={setUpdateMembersList}
          ></ListMembers>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={updateMembers}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalAddMember;

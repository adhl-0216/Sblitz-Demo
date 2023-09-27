import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { auth, db } from "../FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import AddMember from "./ManageMembers/AddMember";
import { Member } from "../classes/Member";
import ListMembers from "./ManageMembers/ListMembers";

interface Props {
  allLists: any[];
  allMembers: any[];
  setAllMembers: (params: Member[]) => void;
  setSelectedList: (params?: any) => void;
}

const CreateList = ({ allLists, setAllMembers, setSelectedList }: Props) => {
  const [user] = useAuthState(auth);
  const [show, setShow] = useState(false);
  const [listName, setListName] = useState("");
  const [newMembersList, setNewMembersList] = useState<Member[]>([]);

  const handleShow = () => {
    setShow((curr) => !curr);
  };

  const handleSubmit = () => {
    setDoc(doc(db, user!.uid, listName), {});
    const membersRef = collection(db, user!.uid, listName, "Members");
    newMembersList.forEach((member) => {
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

    setSelectedList(listName);
    setAllMembers(newMembersList);
    handleShow();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create List
      </Button>

      <Modal show={show} onHide={handleShow} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create New List</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex-inline">
          <Form action="">
            <Form.Label>Name</Form.Label>
            <InputGroup hasValidation className="mb-3">
              <Form.Control
                type="text"
                value={listName}
                isInvalid={allLists.includes(listName)}
                onChange={(e) => setListName(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                {listName} already exists.
              </Form.Control.Feedback>
            </InputGroup>

            <Form.Label>Members</Form.Label>
            <AddMember
              updateMembersList={newMembersList}
              setUpdateMembersList={setNewMembersList}
            />
          </Form>

          <ListMembers
            allMembers={newMembersList}
            setAllMembers={setNewMembersList}
          ></ListMembers>
        </Modal.Body>
        <Modal.Footer>
          <Button className="text-end" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateList;

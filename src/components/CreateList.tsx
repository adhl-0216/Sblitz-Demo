import React, { FormEvent, useRef, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Modal,
  Overlay,
  Tooltip,
} from "react-bootstrap";
import { BsCurrencyBitcoin } from "react-icons/bs";

interface Props {
  allLists: string[];
  onCreate: (params?: any) => void;
}

const CreateList = ({ allLists, onCreate }: Props) => {
  const [show, setShow] = useState(false);
  const [listName, setListName] = useState("");
  const [validated, setValidated] = useState(false);
  const [members, setMembers] = useState("");
  const [allMembers, setAllMembers] = useState<string[]>([]);

  const handleShow = () => {
    setShow((curr) => !curr);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    // if (allLists.includes(listName)) form.reportValidity();
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    onCreate(listName);
    handleShow();
  };

  const handleAddMember = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAllMembers((curr) => [...curr, members]);
    setMembers("");
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
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                value={members}
                onChange={(e) => {
                  setMembers(e.target.value);
                }}
              />
              <Button onClick={handleAddMember}>+</Button>
            </InputGroup>
            <ul>
              {allMembers.map((m) => {
                return <li key={m}>{m}</li>;
              })}
            </ul>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateList;

import React, { useRef, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BsFillCircleFill } from "react-icons/bs";
import { HiUserAdd } from "react-icons/hi";

const AddMember = () => {
  const [member, setMember] = useState("");
  const [show, setShow] = useState(false);
  const [memberColor, setMemberColor] = useState<string>("");

  const randomColor = () => {
    let r = Math.floor(Math.random() * 255).toString(16);
    let g = Math.floor(Math.random() * 255).toString(16);
    let b = Math.floor(Math.random() * 255).toString(16);
    let hex = "#" + r + g + b;
    setMemberColor(hex);
  };

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(member);
    setMember("");
  };

  const handleShow = () => {
    setShow((curr) => !curr);
  };

  function handleClose(): void {
    throw new Error("Function not implemented.");
  }

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
          <InputGroup>
            <Form.Control
              type="text"
              value={member}
              onChange={(e) => {
                setMember(e.target.value);
              }}
              placeholder="name"
            />
            <Button onClick={randomColor}>
              <IconContext.Provider value={{ color: memberColor }}>
                <BsFillCircleFill />
              </IconContext.Provider>
            </Button>
            <Button
              variant="primary"
              className="mx-auto text-center"
              onClick={handleAdd}
            >
              <HiUserAdd></HiUserAdd>
            </Button>
          </InputGroup>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddMember;

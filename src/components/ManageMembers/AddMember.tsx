import React, { useEffect, useState } from "react";
import { Button, CloseButton, Form, InputGroup } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BsFillCircleFill } from "react-icons/bs";
import { HiUserAdd } from "react-icons/hi";
import { Member } from "../../classes/Member";

interface Props {
  updateMembersList: Member[];
  setUpdateMembersList: (params: any) => void;
}

const AddMember = ({ updateMembersList, setUpdateMembersList }: Props) => {
  const [member, setMember] = useState("");
  const [memberColor, setMemberColor] = useState("");

  const randomColor = () => {
    let r = Math.floor(Math.random() * 255).toString(16);
    let g = Math.floor(Math.random() * 255).toString(16);
    let b = Math.floor(Math.random() * 255).toString(16);
    let hex = "#" + r + g + b;
    setMemberColor(hex);
  };

  useEffect(() => {
    randomColor();
  }, []);

  const handleAdd = () => {
    if (member == "") return;

    setUpdateMembersList((curr: any) => {
      return [...curr, new Member(member, memberColor)];
    });

    setMember("");
    randomColor();
  };

  return (
    <div>
      <InputGroup hasValidation className="m-2">
        <Button variant="secondary" onClick={randomColor}>
          <IconContext.Provider value={{ color: memberColor }}>
            <BsFillCircleFill onClick={randomColor} />
          </IconContext.Provider>
        </Button>
        <Form.Control
          type="text"
          value={member}
          onChange={(e) => {
            setMember(e.target.value);
          }}
          placeholder="name"
        />
        <Button variant="secondary" onClick={handleAdd}>
          <HiUserAdd></HiUserAdd>
        </Button>
        <Button variant="none"></Button>
      </InputGroup>
    </div>
  );
};

export default AddMember;

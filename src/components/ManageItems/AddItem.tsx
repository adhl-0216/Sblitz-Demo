import React, { useState } from "react";
//Firebase
import { auth, db } from "../../FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";
//React-bootstrap
import { Button, Dropdown, Form, Stack } from "react-bootstrap";
import { IoMdAddCircle } from "react-icons/io";
import { useAuthState } from "react-firebase-hooks/auth";
import { Member } from "../../classes/Member";
import { IconContext } from "react-icons";
import { BsFillCircleFill } from "react-icons/bs";
import CurrencyInput from "react-currency-input-field";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

interface Props {
  allMembers: Member[];
  selectedList: string;
  onAdd: (params?: any) => void;
}

const AddItem = ({ allMembers, selectedList, onAdd }: Props) => {
  const [user] = useAuthState(auth);

  const [itemName, setItemName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [type, setType] = useState<Member>();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const listData = {
      name: itemName,
      price: Number(price),
      quantity: Number(quantity),
      type: type ?? "Equal",
    };

    await addDoc(collection(db, user!.uid, selectedList, "Items"), listData);

    alert("item added");

    onAdd(true);
  };

  const handleSelect = (eventKey: any) => {
    console.log(eventKey);
    const selectedMember = allMembers.find((member) => member.id == eventKey);
    console.log(selectedMember);
    setType(selectedMember);
  };

  return (
    <div className="px-3 m-3">
      <h3 className="">Add Item</h3>

      <Form className="d-flex md-3 ">
        <Stack direction="horizontal" gap={3}>
          <Form.Label>Item</Form.Label>
          <Form.Control
            type="text"
            id="name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            size="sm"
          ></Form.Control>
          <Form.Label>Price(€)</Form.Label>
          <CurrencyInput
            onValueChange={(value) => setPrice(Number(value))}
            decimalsLimit={2}
            className="form-control"
          ></CurrencyInput>
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            id="quantity"
            name="quantiy"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={0}
            step={1}
          ></Form.Control>
          <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle
              variant="primary"
              className="d-flex align-items-center gap-1"
            >
              <IconContext.Provider value={{ color: type?.color }}>
                <BsFillCircleFill />
              </IconContext.Provider>
              {type == null ? "Equal" : type?.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                eventKey="Equal"
                className="d-flex p-1 align-items-center gap-1"
              >
                <IconContext.Provider value={{ color: "black" }}>
                  <BsFillCircleFill />
                </IconContext.Provider>
                Equal
              </Dropdown.Item>
              {allMembers.map((member) => {
                return (
                  <DropdownItem
                    key={member.key}
                    eventKey={member.id}
                    className="d-flex p-1 align-items-center gap-1"
                  >
                    <IconContext.Provider value={{ color: member.color }}>
                      <BsFillCircleFill />
                    </IconContext.Provider>
                    {member.name}
                  </DropdownItem>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="primary" onClick={handleSubmit} className="px-2">
            <IoMdAddCircle></IoMdAddCircle>
          </Button>
        </Stack>
      </Form>
    </div>
  );
};

export default AddItem;

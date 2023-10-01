import React, { useEffect, useState } from "react";
// import { Item } from "../App";
import { AiFillEdit } from "react-icons/ai";
import { BsFillCircleFill, BsFillCloudArrowUpFill } from "react-icons/bs";
import { auth, db } from "../../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Member } from "../../classes/Member";
import {
  Button,
  Card,
  CloseButton,
  Dropdown,
  Form,
  Stack,
} from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { IconContext } from "react-icons";
import CurrencyInput from "react-currency-input-field";
import { Item } from "../../classes/Item";

interface Props {
  item: Item;
  selectedList: string;
  allMembers: Member[];
  setItemUpdated: (params?: any) => void;
  setItemDeleted: (params?: any) => void;
}

const ListItem = ({
  item,
  selectedList,
  allMembers,
  setItemUpdated,
  setItemDeleted,
}: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState<Number>(item.price);
  const [quantity, setQuantity] = useState<Number>(item.quantity);
  const [type, setType] = useState<any>(item.type);

  const [user] = useAuthState(auth);

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isActive == true) {
      item.name = name;
      item.price = Number(price);
      item.quantity = Number(quantity);
      item.type = type;

      console.log(item);

      Item.updateItem(item, selectedList, user!.uid);
      setItemUpdated(true);
    }

    setIsActive((curr) => !curr);
    console.log("edit");
  };

  const handleSelect = (eventKey: any) => {
    const selectedMember =
      allMembers.find((member) => member.id == eventKey) || "Equal";
    item.type = selectedMember;
    console.log(item.type);
    setType(() => {
      return selectedMember;
    });
    setItemUpdated(true);
  };

  const handleDelete = () => {
    const target = item.id as string;
    Item.delete(target, selectedList, user!.uid);
    setItemDeleted(true);
  };

  return (
    <Card>
      <Card.Body className="d-inline-flex align-items-center">
        <Form>
          <Button variant="none" onClick={handleEdit}>
            {isActive ? <BsFillCloudArrowUpFill /> : <AiFillEdit />}
          </Button>
          <fieldset disabled={!isActive} className="d-inline-flex p-2">
            <Form.Control
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
            <Form.Label className="p-2">Price(€)</Form.Label>
            <CurrencyInput
              value={price.toString()}
              onValueChange={(value) => setPrice(Number(value))}
              decimalsLimit={2}
              className="form-control"
            ></CurrencyInput>
            <Form.Label className="p-2">Quantity</Form.Label>
            <Form.Control
              type="number"
              className="form-control"
              value={Number(quantity)}
              onChange={(e) => setQuantity(Number(e.target.value))}
            ></Form.Control>
          </fieldset>
        </Form>

        <Dropdown onSelect={handleSelect} className="p-2">
          <Dropdown.Toggle
            variant="primary"
            className="d-flex align-items-center gap-1"
          >
            <IconContext.Provider value={{ color: type?.color }}>
              <BsFillCircleFill />
            </IconContext.Provider>
            {type == "Equal" ? "Equal" : type!.name}
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

        <div className="text-end ms-auto">
          <CloseButton onClick={handleDelete}></CloseButton>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ListItem;

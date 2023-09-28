import { useState } from "react";
//Firebase
import { auth, db } from "../../FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";
//React-bootstrap
import { Button, Form, Stack } from "react-bootstrap";
import { IoMdAddCircle } from "react-icons/io";
import { useAuthState } from "react-firebase-hooks/auth";
import { Member } from "../../classes/Member";
import { IconContext } from "react-icons";
import { BsFillCircleFill } from "react-icons/bs";

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
  const [type, setType] = useState<string>("");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const listData = {
      name: itemName,
      price: Number(price),
      quantity: Number(quantity),
      type: type,
    };

    await addDoc(collection(db, user!.uid, selectedList, "Items"), listData);

    alert("item added");

    onAdd(true);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.selectedOptions[0].value;
    console.log(value);
    setType(value);
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
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            min={0}
          ></Form.Control>
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            id="quantity"
            name="quantiy"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={0}
          ></Form.Control>
          <Form.Label>Type</Form.Label>
          <Form.Select
            id="type"
            className="form-select form-select-sm"
            defaultValue={"Equal Split"}
            onChange={handleSelect}
          >
            <option value="Equal">Equal Split</option>
            {allMembers.map((member) => {
              return (
                <option
                  key={member.key}
                  value={member.id}
                  className="d-flex p-1 align-items-center gap-1"
                >
                  {member.name}
                </option>
              );
            })}
          </Form.Select>
          <Button variant="primary" onClick={handleSubmit} className="px-2">
            <IoMdAddCircle></IoMdAddCircle>
          </Button>
        </Stack>
      </Form>
    </div>
  );
};

export default AddItem;

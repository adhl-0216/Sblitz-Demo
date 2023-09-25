import React, { useState } from "react";
// import { Item } from "../App";
import { AiFillEdit } from "react-icons/ai";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { auth, db } from "../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  item: any;
  onPosted: (params?: any) => void;
  selectedList: string;
  allMembers: string[];
}

const ListItem = ({ item, selectedList, allMembers }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState<Number>(item.price);
  const [quantity, setQuantity] = useState<Number>(item.quantity);
  const [type, setType] = useState(item.type);

  const id = item.docId;

  const [user] = useAuthState(auth);
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const item = {
      name: name,
      price: price,
      quantity: quantity,
      type: type,
    };
    const docRef = doc(db, user!.uid, selectedList, "Items", id);
    setDoc(docRef, item);
    setIsActive((curr) => !curr);
  };

  const handleSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    const select = e.target as HTMLSelectElement;
    console.log(select.value);
  };

  return (
    <>
      <form className="d-inline-flex card-body p-2">
        <fieldset disabled={!isActive} className="d-inline-flex p-2">
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label className="form-label p-2">Price(&euro;)</label>
          <input
            type="number"
            className="form-control"
            value={Number(price)}
            onChange={(e) => setPrice(Number(e.target.value))}
          ></input>
          <label className="form-label p-2">Quantity</label>
          <input
            type="number"
            className="form-control"
            value={Number(quantity)}
            onChange={(e) => setQuantity(Number(e.target.value))}
          ></input>
          <label className="form-label p-2">Type</label>
          <select
            id="type"
            className="form-select"
            defaultValue={"Equal Split"}
            onChange={handleSelect}
          >
            <option value="Equal Split">Equal Split</option>
            {allMembers!.map((member) => {
              return <option value={member}>{member}</option>;
            })}
          </select>
        </fieldset>

        <button className="btn" onClick={handleEdit}>
          {isActive ? <BsFillCloudArrowUpFill /> : <AiFillEdit />}
        </button>
      </form>
    </>
  );
};

export default ListItem;

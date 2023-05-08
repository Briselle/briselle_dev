import { useContext } from "react";
import { FormContext } from "../FormContext";
import {Form,Icon,Popup} from "semantic-ui-react";
export default function DateField(props) {
  const {handleChange} = useContext(FormContext);
  const value_id = "DATEVAL"+Math.floor((Math.random() * 100) + 1);

  return (
    <div>
      <Form.Group inline>
      <Form.Input onChange={(event)=>handleChange(props.id,event,value_id)} label="Date of Joining" type="date" />
      <Popup content={props.desc} trigger={<Icon name="info circle"/>} /> </Form.Group>
    </div>
  );
}

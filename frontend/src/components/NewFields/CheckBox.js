import { useContext} from "react";
import { FormContext } from "../FormContext";
import { Form,Icon,Popup} from 'semantic-ui-react'

export default function CheckBox(props) {
  const {handleChange} = useContext(FormContext);
  const value_id = "CHECKVAL"+Math.floor((Math.random()*100)+1);
  return (
    <div>
      <Form.Group inline>
        <Form.Field>
      <label htmlFor="checkItem">{props.label}</label>
      <input
        type="checkbox"
        className="checkItem"
        onChange={(event)=>handleChange(props.id,event,value_id)}
      /></Form.Field>
      <Popup content={props.desc} trigger={<Icon name="info circle"/>} /> </Form.Group>
    </div>
  );
}

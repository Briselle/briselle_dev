import { useContext, useState } from "react";
import { FormContext } from "../FormContext";
import { Input,Form,Icon,Popup} from 'semantic-ui-react'

export default function TextField(props) {
  const [error, setError] = useState("");
  const {handleChange} = useContext(FormContext);
  const value_id = "TXTVAL"+Math.floor((Math.random() * 100) + 1);

  function validateInput(event) {
    if (event.target.value === "") {
      setError("*Required");
    }
    else{
      setError("");
    }
  }
  return (
    <div>
      <Form.Group inline>
      <Form.Field
        control={Input}
        type="text"
        name="text-field"
        onChange={(event)=>handleChange(props.id,event,value_id)}
        label ={props.label}
        maxLength={props.max_length}
        onBlur={(event)=>validateInput(event)}
      /><Popup content={props.desc} trigger={<Icon name="info circle"/>} /> </Form.Group>
      <div className="error-box" style={{ color: "red" }}>
        {error}
      </div>
    </div>
  );
}

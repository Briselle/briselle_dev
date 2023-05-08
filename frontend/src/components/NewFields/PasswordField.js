import { useContext, useState } from "react";
import { FormContext } from "../FormContext";
import { Form,Icon,Popup} from 'semantic-ui-react'

export default function PasswordField(props) {
  const {handleChange} = useContext(FormContext);
  const value_id = "PASVAL"+Math.floor((Math.random()*100)+1);
  const [error, setError] = useState("");

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
      <Form.Input
        onChange={(event)=>handleChange(props.id,event,value_id)}
        type="password"
        className="form-control"
        name="text-field"
        value={props.fld_value}
        label = {props.label}
        maxLength={props.max_length}
        onBlur={(event)=>validateInput(event)}
      /><Popup content={props.desc} trigger={<Icon name="info circle"/>} /></Form.Group>
      <div className="error-box" style={{ color: "red" }}>
        {error}
      </div>
    </div>
  );
}

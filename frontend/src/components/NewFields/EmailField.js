import { useState,useContext } from "react";
import { FormContext } from "../FormContext";
import { Form, Popup,Icon} from 'semantic-ui-react'

export default function EmailField(props) {
  const {handleChange} = useContext(FormContext);
  const [error, setError] = useState("");
  const value_id = "EMVAL"+Math.floor((Math.random()*100)+1);

  function validateEmail(event) {
    const {value} = event.target;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(value).toLowerCase())) {
      setError("Email is invalid, please enter a valid email");
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
        onBlur={(event)=>validateEmail(event)}
        label={props.label}
        type="email"
        className="form-control"
        name="email"
      /><Popup content={props.desc} trigger={<Icon name="info circle"/>} /> </Form.Group>
      <div className="error-box" style={{ color: "red" }}>
        {error}
      </div>
    </div>
  );
}

import {Form,Popup,Icon } from 'semantic-ui-react'
import { useContext, useState } from "react";
import { FormContext } from "../FormContext";

export default function TextAreaField(props) {
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
      <Form.TextArea
        fluid
        onChange={(event)=>handleChange(props.id,event,value_id)}
        onBlur ={(event)=>validateInput(event)}
        className="form-control"
        label={props.label}
        id="text-area"
        name="text-area"
      /><Popup content={props.desc} trigger={<Icon name="info circle"/>} /> </Form.Group>
        <div className="error-box" style={{ color: "red" }}>
        {error}
      </div>
    </div>
  );
}

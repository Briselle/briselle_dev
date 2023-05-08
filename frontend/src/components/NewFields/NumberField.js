import { useContext, useState } from "react";
import { FormContext } from "../FormContext";
import { Form,Icon,Popup} from 'semantic-ui-react'

export default function NumberField(props) {
  const [error, setError] = useState("");
  const {handleChange} = useContext(FormContext);
  const value_id = "NUMVAL"+Math.floor((Math.random() * 100) + 1);

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
        type="number"
        className="form-control"
        onChange={(event)=>handleChange(props.id,event,value_id)}
        id="phone"
        name="phone"
        label="Phone Number"
        value={props.fld_value}
        onBlur ={(event)=>validateInput(event)}
        onInput={(e) => {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, 10);
        }}
      /><Popup content={props.desc} trigger={<Icon name="info circle"/>} /> </Form.Group>
        <div className="error-box" style={{ color: "red" }}>
        {error}
      </div>
    </div>
  );
}
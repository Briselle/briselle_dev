import { Radio } from "semantic-ui-react";
import { useContext } from "react";
import { FormContext } from "../FormContext";
import { Form, Icon, Popup } from 'semantic-ui-react'


export default function RadioButton(props) {
  const { handleChange } = useContext(FormContext);
  const value_id = "RADIOVAL" + Math.floor((Math.random() * 100) + 1);
  var options = ["male", "female", "others"];

  return (
    <div>
      <Form.Group inline>
        <Form.Field>
          <label htmlFor="radioButton">{props.label}</label>
          <div className="radioButton">
            {options.map((item, i) => (
              <span key={i}>
                <Radio
                  key={i}
                  onChange={(event) => handleChange(props.id, event, value_id)}
                  label={item}
                />
              </span>
            ))}
          </div>
        </Form.Field>
        <Popup content={props.desc} trigger={<Icon name="info circle" />} /> </Form.Group>
    </div>
  );
}

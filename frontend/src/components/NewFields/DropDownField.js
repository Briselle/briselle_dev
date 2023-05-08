import { useContext} from "react";
import { FormContext } from "../FormContext";
import { Form,Icon,Popup} from 'semantic-ui-react'


export default function DropDowField(props) {
  const {handleChange} = useContext(FormContext);
  const value_id = "SELECTVAL"+Math.floor((Math.random()*100)+1);

 // const option =[{ key: '1', value: 'sample', text: 'Option 1' },
  //{ key: '2', value: 'sample', text: 'Option 2' },
  //{ key: '3', value: 'sample', text: 'Option 3' },
  //{ key: '4', value: 'sample', text: 'Option 4' },]

  const options = ["Option 1","Option 2","Option 3","Option 4","Option 5"];

  return (
    <div>
      <Form.Group inline>
      <label htmlFor="dropdown">{props.label}</label>
      <select
        className="custom-select "
        onChange={(event)=>handleChange(props.id,event,value_id)}
      >
        {options.map((item,key) => (
          <option key={key} value={item}> {item}</option>
        ))}
      </select>
      <Popup content={props.desc} trigger={<Icon name="info circle"/>} /> </Form.Group> 
    </div>
  );
}

/*{props.options.map((item) => (
          <option value={item.toLowerCase()}> {item}</option>
        ))}*/
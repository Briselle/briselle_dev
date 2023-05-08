import { useState, useEffect } from "react";
import axios from "axios";
import FormElement from "./FormElement";
import { Button, Form, Grid, Divider } from "semantic-ui-react";
import { FormContext } from "./FormContext";
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


toast.configure();
export default function FormDetails() {

  const [fields, setFields] = useState(null);

  const notify = ()=>{
    toast("Values saved successfully!");
}
  useEffect(() => {
   getData();
  }, []);

  const getData = async () => {
    const url = "http://localhost:5000/get_values";
    axios.get(url).then((response) => {
        const jsonData = response.data;
        setFields(jsonData);
    })
        .catch(error => console.log(`Error: ${error}`));
        
   };
 
    /*const getDetails =(value)=>{
       setUser((prev)=>({...prev,value:value.data}));
     }*/


  const handleSubmit = async function (event) {
    try {
      const res = await axios.post("http://localhost:5000/values",
        {
          body: JSON.stringify(fields)
        },
        { headers: { 'Content-Type': 'application/json' } });

      if (res.status === 200) {
        event.target.reset()
        window.location.reload();
        notify();
      }
    }
    catch (err) {
      console.log(err);
    }

  }

  const handleChange = (id, event, value_id) => {
    const newFields = fields;
    newFields.forEach((field) => {
      if (field.field_id === id) {
        field["values"] = {
          "value_id": value_id,
          "value": event.target.value
        }
      };
      setFields(newFields);
    })
  }

    return ( 
        <FormContext.Provider value={{ handleChange }}>
        <div>
            <div className="ui menu">
                <a href="/display_objects" className="item">Display Objects</a>
                {/*<a href="create_objects" className="item">Create Objects</a>*/}
                {/*<a href="create_fields" className="item">Create Fields</a>*/}
                <a href="/load_form" className="item">Form</a>
                <a href="/display_values" className="item">View Values</a>
            </div>
        </div>
      <div>
        <h2 style={{ marginTop: "2rem" }}>Form</h2>
        <Divider />
        <Grid style={{ height: '100vh' }}>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form onSubmit={handleSubmit}>
              {fields ? fields.map((field, key) => <FormElement field={field} key={key} />) : null}
              <Button type="submit">
                Submit
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    </FormContext.Provider>
  );
}

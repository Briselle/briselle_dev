import React, { Fragment, useState, useEffect } from 'react';
import { Form, Message, Grid, Segment, Header } from 'semantic-ui-react'
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

toast.configure();
function CreateFields() {
    const fld_id = "FLD" + Math.floor((Math.random() * 1000) + 1);
    const [data, setData] = useState({ objectId: "", fldId: fld_id, fldName: "", fldType: "", fldDesc: "",maxLength:"" });
    const options = [{ key: 'text', value: 'text', text: 'Text' },
    { key: 'num', value: 'number', text: 'Number' },
    { key: 'email', value: 'email', text: 'Email' },
    { key: 'pass', value: 'password', text: 'Password' },
    { key: 'phone', value: 'phone', text: 'Phone' },
    { key: 'date', value: 'date', text: 'Date' },
    { key: 'textarea', value: 'textarea', text: 'Text Area' },
    { key: 'check', value: 'checkbox', text: 'Check Box' },
    { key: 'radio', value: 'radio', text: 'Radio Button' },
    { key: 'dropdown', value: 'dropdown', text: 'Dropdown' }
    ];

    const [objects, setObjects] = useState([]);
    const getObjects = (() => {
        const url = "http://localhost:5000/object_data";
        axios.get(url).then((response) => {
            const jsonData = response.data;
            setObjects(jsonData);
        })
            .catch(error => console.log(`Error: ${error}`));

    })
    useEffect(() => {
        getObjects();
    }, []);

    const handleChange = async function (event) {
        const { name, value } = event.target;
        await setData({ ...data, [name]: value });
    }

    const notify = ()=>{
        toast("New Field created successfully!");
    }

    const handleSubmit = async function (event) {
        //event.preventDefault();

        const fld_json = `{"fld_name":"${data.fldName}","fld_datatype":"${data.fldType}","fld_desc":"${data.fldDesc}","max_length":"${data.maxLength}"}`;
        try {
            const res = await axios.post("http://localhost:5000/field_data",
                {
                    obj_id: data.objectId, fld_id: data.fldId, fld_json: fld_json
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
    return <Fragment>

        <Grid verticalAlign='top'>
            <Grid.Column style={{ maxWidth: 450, marginTop: "2rem" }}>
                <Header as='h2'>
                    Create New Field
                </Header>

                <Form onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input list="object_ids" name="objectId" value={data.objectId} onChange={(event) => handleChange(event)} fluid label='Object ID' />
                        <datalist id='object_ids'>
                            {objects.map((object,key)=>(
                                <option value={object.obj_id} key={key}>{object.obj_id}</option>
                            ))}
                        </datalist>
                        <Form.Input name="fldId" value={data.fldId} onChange={(event) => handleChange(event)} fluid label='Field ID' disabled />
                        <Form.Input name="fldName" value={data.fldName} onChange={(event) => handleChange(event)} fluid label='Field Name' />
                        <Form.Select
                            name="fldType"
                            onChange={(e, { value }) => { setData({ ...data, fldType: value }) }}
                            fluid
                            label='Field Data Type'
                            options={options}
                        />
                        <Form.TextArea name="fldDesc" value={data.fldDesc} onChange={(event) => handleChange(event)} label='Field Description' />
                        <Form.Input type='number' name="maxLength" value={data.maxLength} onChange={(event) => handleChange(event)} label='Max Length' />
                        <Form.Button>Submit</Form.Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
        <Grid>
            <Grid.Column style={{ minWidth: 50, maxWidth: 450, marginTop: 10 }}>
                <Message positive>
                    <Message.Header>Create fields for objects</Message.Header>
                    <p>
                        Click on the button to create fields for the objects
                    </p>
                </Message>
            </Grid.Column>
        </Grid>
    </Fragment >
}

export default CreateFields;
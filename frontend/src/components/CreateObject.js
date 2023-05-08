import React, { Fragment, useState,useEffect } from 'react';
import { Form, Message, Grid, Segment, Header } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Button} from 'semantic-ui-react';

toast.configure();
function CreateObject() {
    const obj_id = "OBJ" + Math.floor((Math.random() * 1000) + 1);
    const [loading,setLoading] = useState(null);
    const [data, setData] = useState({ objectId: obj_id, objectName: "", objectType: "", objectDesc: "" });
    const options = [{ key: 'standard', value: 'Standard', text: 'Standard' }, { key: 'custom', value: 'Custom', text: 'Custom' }
    ];

    const handleChange = async function (event) {
        const { name, value } = event.target;
        await setData({ ...data, [name]: value });
    }

    const notify = ()=>{
        toast.success("New Object created successfully!");
    }

    useEffect(()=>{
        if(loading===false){
            notify();
        }
    },[loading])

    const handleSubmit = async function (event) {
        //event.preventDefault();
        try {
            setLoading(true);
            const object_json = `{"Object name":"${data.objectName}","Object type":"${data.objectType}","Object description":"${data.objectDesc}"}`;
            const res = await axios.post("http://localhost:5000/object_data",
                {
                    object_id: data.objectId, object_json: object_json
                },
                { headers: { 'Content-Type': 'application/json' } });

            if (res.status === 200) {
                event.target.reset()
                window.location.reload();
                setLoading(false);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return <Fragment>

        <Grid>
            <Grid.Column style={{ maxWidth: 450, marginTop: "2rem" }}>
                <Header as='h2' textAlign='left'>
                    Create New Object
                </Header>

                <Form onSubmit={handleSubmit}>
                    <Segment stacked>
                    <Header size='tiny'>Object ID</Header>
                        <Form.Input name="objectId" value={data.objectId} onChange={(event) => handleChange(event)} fluid disabled />
                        <Form.Input name="objectName" value={data.objectName} onChange={(event) => handleChange(event)} fluid label='Object Name' placeholder='Object Name' />
                        <Form.Select
                            name="objectType"
                            onChange={(e, { value }) => { setData({ ...data, objectType: value }) }}
                            fluid
                            label='Object Type'
                            options={options}
                        />
                        <Form.TextArea name="objectDesc" value={data.objectDesc} onChange={(event) => handleChange(event)} label='Object Description' />
                        <Form.Button>Submit</Form.Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>

        <Link to="/create_fields"><Button content='Create Field' primary /></Link>
        <Grid>
        <Grid.Column style={{minWidth:50,maxWidth: 450,marginTop:10}}>
            <Message positive>
            <Message.Header>Create your own objects</Message.Header>
            <p>
                Create objects with fields and description
            </p>
        </Message>
            </Grid.Column>
        </Grid>
    </Fragment >
}

export default CreateObject;

//maxWidth: 450
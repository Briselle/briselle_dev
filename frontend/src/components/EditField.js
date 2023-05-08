import { Fragment, React, useState,useEffect } from 'react'
import { Grid, Form,Segment } from 'semantic-ui-react'
import {toast} from 'react-toastify';
import axios from 'axios';

toast.configure();
function EditField(props) {

  const options = [{ key: 'text', value: 'text', text: 'Text' },
  { key: 'num', value: 'number', text: 'Number' },
  { key: 'email', value: 'email', text: 'Email' },
  { key: 'phone', value: 'phone', text: 'Phone' },
  { key: 'date', value: 'date', text: 'Date' },
  { key: 'textarea', value: 'textarea', text: 'Text Area' },
  { key: 'check', value: 'checkbox', text: 'Check Box' },
  { key: 'radio', value: 'radio', text: 'Radio Button' },
  { key: 'dropdown', value: 'dropdown', text: 'Dropdown' }
  ];

  const notify = ()=>{
    toast.success("Field updated!");}

  

  const [data, setData] = useState({ objectId: props.item.obj_id, fldId: props.item.field_id,
    fldName: props.item.field_json['fld_name'] ,
    fldType: props.item.field_json['fld_datatype'], 
    fldDesc: props.item.field_json['fld_desc'] });

    const [loading, setLoading] = useState();

    useEffect(()=>{
        if(loading===false){
            notify();
        }
    },[loading])

    const handleChange = async function (event) {
        const {name,value} = event.target;
        await setData({...data,[name]:value});
    }

    const submitHandler = async function(event){
        try {
            setLoading(true);
            const fld_json = `{"fld_name":"${data.fldName}","fld_datatype":"${data.fldType}","fld_desc":"${data.fldDesc}"}`;
            const res = await axios.put(`http://localhost:5000/field_data/${data.fldId}`,
                {
                    fld_json: fld_json
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

    return (<Fragment>
        <Grid textAlign='center'>
            <Grid.Column style={{ maxWidth: 450, marginTop: "2rem" }}>
                <Form onSubmit={submitHandler}>
                    <Segment stacked>
                    <Form.Input name="objectId" value={data.objectId} fluid label='Object ID' onChange={(event) => handleChange(event)} disabled />
                        <Form.Input name="fldId" value={data.fldId} fluid label='Field ID' onChange={(event) => handleChange(event)} disabled />
                        <Form.Input name="fldName" value={data.fldName} fluid label='Field Name' onChange={(event) => handleChange(event)} />
                        <Form.Select
                            name="fldType"
                            value = {data.fldType}
                            fluid
                            label='Field Data Type'
                            options={options}
                            onChange={(e, { value }) => { setData({ ...data, fldType: value }) }}
                        />
                        <Form.TextArea name="fldDesc" value={data.fldDesc} label='Field Description' onChange={(event) => handleChange(event)} />
                        <Form.Button>Submit</Form.Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    </Fragment>)
}

export default EditField;
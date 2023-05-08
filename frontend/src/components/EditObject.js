import { Fragment, React,useState, useEffect } from 'react'
import { Grid, Header, Form,Segment } from 'semantic-ui-react'
import {toast} from 'react-toastify';
import axios from 'axios';

toast.configure();
function EditObject(props) {
    const [loading,setLoading] = useState();
    const options = [{ key: 'standard', value: 'Standard', text: 'Standard' }, { key: 'custom', value: 'Custom', text: 'Custom' }
    ];

    const [data, setData] = useState({ objectId: props.item.obj_id, objectName: props.item.obj_json['Object name'],
     objectType: props.item.obj_json['Object type'], objectDesc: props.item.obj_json['Object description'] });

    const notify = ()=>{
        toast.success("Object updated!");
    }

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
            const object_json = `{"Object name":"${data.objectName}","Object type":"${data.objectType}","Object description":"${data.objectDesc}"}`;
            const res = await axios.put(`http://localhost:5000/object_data/${data.objectId}`,
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

    return (<Fragment>
        <Grid textAlign='center'>
            <Grid.Column style={{ maxWidth: 450, marginTop: "2rem" }}>
                <Form onSubmit={submitHandler}>
                    <Segment stacked>
                        <Header size='tiny'>Object ID</Header>
                        <Form.Input name="objectId" value={data.objectId} onChange={(event) => handleChange(event)} fluid disabled />
                        <Form.Input name="objectName"  value={data.objectName} onChange={(event) => handleChange(event)} fluid label='Object Name' placeholder='Object Name' />
                        <Form.Select
                            name="objectType"
                            fluid
                            value = {data.objectType}
                            label='Object Type'
                            options={options}
                            onChange={(e, { value }) => { setData({ ...data, objectType: value }) }}
                        />
                        <Form.TextArea name="objectDesc" value={data.objectDesc} onChange={(event) => handleChange(event)} label='Object Description' />
                        <Form.Button>Submit</Form.Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    </Fragment>)
}

export default EditObject;
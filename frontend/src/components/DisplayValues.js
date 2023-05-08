import { React, Fragment, useState, useEffect } from 'react';
import { Table,Icon} from 'semantic-ui-react';
import axios from 'axios';

function DisplayValues() {
    const [values, setValues] = useState([]);
    const getValues = async () => {
        const url = "http://localhost:5000/values";
        axios.get(url).then((response) => {
            const jsonData = response.data;
            setValues(jsonData);
        })
            .catch(error => console.log(`Error: ${error}`));
    }

    const deleteValue = async (id)=>{
        alert("Are you sure you want to delete?");
        try{
        const url = `http://localhost:5000/values/${id}`;
        await axios.delete(url);
        setValues(values.filter(val=>val.value_id!==id));
    }
        catch(err){
            console.log(err);
        }     
    }



    useEffect(() => {
        getValues();
    }, [])

    return <Fragment>
        <div>
            <div className="ui menu">
                <a href="/display_objects" className="item">Display Objects</a>
                {/*<a href="create_objects" className="item">Create Objects</a>*/}
                {/*<a href="create_fields" className="item">Create Fields</a>*/}
                <a href="/load_form" className="item">Form</a>
                <a href="/display_values" className="item">View Values</a>
            </div>
        </div>
        <h1>Values</h1>
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Value</Table.HeaderCell>
                    <Table.HeaderCell>Field Label</Table.HeaderCell>
                    <Table.HeaderCell>Field value</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {values.length>0 ?values.map((val) => (
                    <Table.Row key={val.value_id}>
                        <Table.Cell>{val.value_id}</Table.Cell>
                        <Table.Cell>{val.fld_name}</Table.Cell>
                        <Table.Cell>{val.fld_value}</Table.Cell>
                        <Table.Cell><span style={{"cursor":"pointer"}} onClick={(event)=>deleteValue(val.value_id)}><Icon color='red' name="trash"/></span></Table.Cell>
                    </Table.Row>
                )):null}
            </Table.Body>
        </Table>
    </Fragment>
}

export default DisplayValues;
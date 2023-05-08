import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Button, Icon,Modal } from 'semantic-ui-react';
import {useParams} from 'react-router-dom';
import EditField from './EditField';



function DisplayFields(props) {
    const [fields, setFields] = useState([]);
    
    const {objectId} = useParams();

    const getFields = (() => {
        const url = `http://localhost:5000/field_data?id=${objectId}`;
        axios.get(url).then((response) => {
            const jsonData = response.data;
            setFields(jsonData);
        })
            .catch(error => console.log("Error: $(error)"));

    })

    const deleteField = async (id)=>{
        alert("Are you sure you want to delete?");
        try{
        const url = `http://localhost:5000/field_data/${id}`;
        axios.delete(url);
        setFields(fields.filter(field=>field.field_id!==id));
    }
        catch(err){
            console.log(err);
        }     
    }

    useEffect(() => {
        getFields();
    }, []);
    return <Fragment>
        <h1>List of Fields</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell alighn="left"><b>Object Id</b></TableCell>
                        <TableCell alighn="left"><b>Field Id</b></TableCell>
                        <TableCell align="left"><b>Field Name</b></TableCell>
                        <TableCell align="left"><b>Field Data Type</b></TableCell>
                        <TableCell align="left"><b>Field Description</b></TableCell>
                        <TableCell align="left"><b>Created At&nbsp;</b></TableCell>
                        <TableCell align="left"><b>Updated At&nbsp;</b> </TableCell>
                        <TableCell align="left"><b>Action&nbsp;</b> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {fields.length>0 ? fields.map((item) => (
                        <TableRow
                            key={item.field_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                            {item.obj_id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                            {item.field_id}
                            </TableCell>
                            <TableCell align="left" component="th" scope="row">
                                {item.field_json['fld_name']}
                            </TableCell>
                            <TableCell align="left">{item.field_json['fld_datatype']}</TableCell>
                            <TableCell align="left">{item.field_json['fld_desc']}</TableCell>
                            <TableCell align="left">{item["created_ts"]}</TableCell>
                            <TableCell align="left">{item["updated_ts"]}</TableCell>
                            <TableCell align="left"><span style={{"cursor":"pointer"}}><Modal
                                    trigger={<Icon color="green" name="edit"></Icon>}
                                    header='Edit Object'
                                    content={<EditField item={item}/>}
                                    actions={['Cancel']}
                                /></span>
                            <span style={{"cursor":"pointer"}} onClick={(event)=>deleteField(item.field_id)}><Icon color='red' name="trash"/></span>
                            </TableCell>
                        </TableRow>
                    )):null}
                </TableBody>
            </Table>
        </TableContainer>
        <Link to="/create_fields"><Button content='Create Fields' primary /></Link>
    </Fragment>
}

export default DisplayFields;
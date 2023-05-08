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
import { Button, Icon, Modal} from 'semantic-ui-react';
import EditObject from './EditObject';


function DisplayObjects() {
    const [objects, setObjects] = useState([]);
    const getObjects = (() => {
        const url = "http://localhost:5000/object_data";
        axios.get(url).then((response) => {
            const jsonData = response.data;
            setObjects(jsonData);
        })
            .catch(error => console.log(`Error: ${error}`));

    })

    const deleteField = async (event, id) => {
        alert("Are you sure you want to delete?");
        try {
            const url = `http://localhost:5000/object_data/${id}`;
            await axios.delete(url);
            setObjects(objects.filter(object => object.obj_id !== id));
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getObjects();
    }, []);

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
        <h1>List of objects</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell><b>Object Id</b></TableCell>
                        <TableCell align="left"><b>Object Name</b></TableCell>
                        <TableCell align="left"><b>Object Type</b></TableCell>
                        <TableCell align="left"><b>Object Description</b></TableCell>
                        <TableCell align="left"><b>Created At&nbsp;</b></TableCell>
                        <TableCell align="left"><b>Updated At&nbsp;</b></TableCell>
                        <TableCell align="left"><b>Action&nbsp;</b></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {objects.length > 0 ? objects.map((item) => (
                        <TableRow
                            key={item.obj_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Link to={`/display_fields/${item.obj_id}`}>{item.obj_id}</Link>
                            </TableCell>
                            <TableCell align="left" component="th" scope="row">
                                {item.obj_json['Object name']}
                            </TableCell>
                            <TableCell align="left">{item.obj_json['Object type']}</TableCell>
                            <TableCell align="left">{item.obj_json['Object description']}</TableCell>
                            <TableCell align="left">{item["created_ts"]}</TableCell>
                            <TableCell align="left">{item["updated_ts"]}</TableCell>
                            <TableCell align="left"><span style={{ "cursor": "pointer" }}>
                                <Modal
                                    trigger={<Icon color="green" name="edit"></Icon>}
                                    header='Edit Object'
                                    content={<EditObject item={item}/>}
                                    actions={['Cancel']}
                                /></span>
                                <span style={{ "cursor": "pointer" }} onClick={(event) => deleteField(event, item.obj_id)}><Icon color='red' name="trash" /></span>
                            </TableCell>
                        </TableRow>
                    )) : null}
                </TableBody>
            </Table>
        </TableContainer>
        <Link to="/create_objects"><Button content='Create Object' primary /></Link>
    </Fragment>
}


//export function Navbar(){
//return (
//    <div>
//        <div className="ui menu">
//            <a href="/" className="item">Home</a>
//            <a href="/display_setup" className="item">Setup</a>
//            <a href="/" className="right teal item">Logout</a>
//        </div>
//    </div>)
//}
export default DisplayObjects;
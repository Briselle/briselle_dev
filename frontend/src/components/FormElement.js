import React from 'react';
import PhoneField from "./NewFields/PhoneFields";
import TextField from "./NewFields/TextField";
import EmailField from "./NewFields/EmailField";
import TextAreaField from "./NewFields/TextAreaField";
import DropDownField from "./NewFields/DropDownField";
import RadioButton from "./NewFields/RadioButton";
import CheckBox from "./NewFields/CheckBox";
import DateField from "./NewFields/DateField";
import NumberField from './NewFields/NumberField';
import PasswordField from "./NewFields/PasswordField";

const FormElement = ({ field: {field_id,field_json} }) => {

    switch (field_json.fld_datatype) {
        case 'text':
            return (<TextField label={field_json.fld_name} id={field_id} fld_value={field_json.fld_value} desc={field_json.fld_desc} max_length={field_json.max_length} />)
        case 'phone':
            return (<PhoneField label={field_json.fld_name} id={field_id} fld_value={field_json.fld_value} desc={field_json.fld_desc} />)
        case 'number':
            return (<NumberField label={field_json.fld_name} id={field_id} fld_value={field_json.fld_value} desc={field_json.fld_desc} max_length={field_json.max_length} />)
        case 'email':
            return (<EmailField label={field_json.fld_name} id={field_id} fld_value={field_json.fld_value} desc={field_json.fld_desc} max_length={field_json.max_length} />)
        case 'password':
            return (<PasswordField label={field_json.fld_name} id={field_id} fld_value={field_json.fld_value} desc={field_json.fld_desc} />)
        case 'textarea':
            return (<TextAreaField label={field_json.fld_name} id={field_id} fld_value={field_json.fld_value} desc={field_json.fld_desc} max_length={field_json.max_length}/>)
        case 'checkbox':
            return (<CheckBox label={field_json.fld_name} id={field_id} fld_value={field_json.fld_value} desc={field_json.fld_desc} />)
        case 'dropdown':
            return (<DropDownField label={field_json.fld_name} id={field_id} fld_value={field_json.fld_value} desc={field_json.fld_desc} />)
        case 'radio':
            return (<RadioButton label={field_json.fld_name} id={field_id} fld_value={field_json.fld_value} desc={field_json.fld_desc} />)
        case 'date':
            return (<DateField label={field_json.fld_name} id={field_id} fld_value={field_json.fld_value} desc={field_json.fld_desc} />)
        default:
            return (<TextField label={field_json.fld_name} id={field_id} fld_value={field_json.fld_value} desc={field_json.fld_desc} />)

    }
}

export default FormElement;
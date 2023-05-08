CREATE DATABASE briselle;

CREATE TABLE object_info(
    obj_id varchar(15) PRIMARY KEY, 
    obj_json jsonb, 
    created_ts timestamp default current_timestamp,
    updated_ts timestamp);

CREATE TABLE field_info(
    obj_id varchar(15), 
	field_id varchar(15) PRIMARY KEY,
    field_json jsonb, 
    created_ts timestamp default current_timestamp,
    updated_ts timestamp,
	FOREIGN KEY(obj_id) 
	  REFERENCES object_info(obj_id));

CREATE TABLE data_values(value_id VARCHAR(15) PRIMARY KEY,fld_name VARCHAR(50),fld_value VARCHAR(50));


#adding dummy data
INSERT INTO object_info VALUES('OBJ102','{"Object name":"Contacts","Object type":"text","Object description":"To save contact information"}');
UPDATE object_info
SET obj_json = obj_json - 'Object type' || '{"Object type":"text"}'
WHERE obj_json->>'Object name' = 'Contacts';

INSERT INTO field_info VALUES('OBJ101','FLD101',
							  '{"fld_name":"Business Name","fld_datatype":"text","fld_desc":"To store the registered business name"}');
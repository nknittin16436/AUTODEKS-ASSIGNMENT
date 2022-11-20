import React, { Fragment, useState, useEffect } from 'react';
import { addNewUser, clearErrors } from '../../action/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import {
    Input,
    Space,
    Modal,
    Checkbox,
    Button
} from "antd";
import { ADD_USER_RESET } from '../../constants/userConstant';
import isEmail from 'validator/es/lib/isEmail';
import isStrongPassword from 'validator/es/lib/isStrongPassword';
const Newuser = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, isAdded } = useSelector((state) => state.profile)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);


    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, phone, isResetPassword);
        let userPassword = password;
        if (isResetPassword) {
            userPassword = "Abcd1234$";
        }
        if (validateData(name, email, phone, userPassword)) {
            dispatch(addNewUser(name, email, phone, userPassword));
            handleCancelClick();
        }
    }
    const onChange = (e) => {
        setIsResetPassword(e.target.checked);

    };
    const handleCancelClick = () => {
        setIsModalVisible(false);
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setIsResetPassword(false);
    }


    const validateData = (name, email, phone, password) => {
        if (name.trim().length < 3) {
            alert.error("Invalid name or less than 3 chracters");
            return false;
        }

        if (!isEmail(email)) {
            alert.error("Invalid Email Id");
            return false;
        }
        if (phone.trim().length !== 10) {
            alert.error("phone number should be of 10 digit");
            return false;
        }
        if (!/^\d+$/.test(phone)) {
            alert.error("Phone number should contain numbers only");
            return false;
        }

        if (!isStrongPassword(password)) {
            alert.error("Password Should contain One upper case,one lower case,one number and one special character and atleast 8 characters long");
            return false;
        }

        return true;
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors());
        }
        if (isAdded) {
            alert.success("User added succesfully");
            dispatch({ type: ADD_USER_RESET })
        }

    }, [error, isAdded]);
    return (

        <Fragment>
            <Space style={{ margin: 20 }}>
                <Button type="primary" onClick={() => setIsModalVisible(true)}>Add A New User</Button>
            </Space>
            <Modal
                title="Add New User"
                open={isModalVisible}
                onOk={handleUpdateSubmit}
                onCancel={handleCancelClick}
                okText="Add User"
            >
                <div>
                    <Space>
                        Name:{" "}
                        <Input
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Space>
                    <br />
                    <br />
                    <Space>
                        Email:{" "}
                        <Input
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Space>
                    <br />
                    <br />
                    <Space>
                        Phone:{" "}
                        <Input
                            placeholder="Enter Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Space>
                    <br />
                    <br />
                    {!isResetPassword && <Space>
                        Password:{" "}
                        <Input
                            placeholder="Enter Phone"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Space>}
                    <br />
                    <br />
                    <Space>
                        <Checkbox onChange={onChange}>Use Default password</Checkbox>
                    </Space>
                </div>
            </Modal>
        </Fragment>
    );
}


export default Newuser;
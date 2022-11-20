import React, { Fragment, useState,useEffect } from 'react';
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
        dispatch(addNewUser(name, email, phone, userPassword));
        handleCancelClick();
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
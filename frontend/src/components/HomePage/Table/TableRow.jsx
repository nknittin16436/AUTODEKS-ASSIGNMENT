import React, { Fragment, useState, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, deleteUser, updateUser } from '../../../action/userAction';
import {
    Input,
    Space,
    Modal,
    Checkbox
} from "antd";
import { useAlert } from 'react-alert';
import { DELETE_USER_RESET, UPDATE_USER_RESET } from '../../../constants/userConstant';
import isEmail from 'validator/es/lib/isEmail';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const Tablerow = ({ user }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const handelDeleteUser = async (e) => {
        e.preventDefault();
        dispatch(deleteUser(user.id));
    }
    const { error, isUpdated, isDeleted } = useSelector((state) => state.profile);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);


    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, phone, isResetPassword);
        const userData = { name, email, phone, isResetPassword };
        if (validateData(name, email, phone)) {
            dispatch(updateUser(user.id, userData));
            setIsModalVisible(false);
        }
    }
    const onChange = (e) => {
        setIsResetPassword(e.target.checked);
    };
    const handleCancelClick = () => {
        setIsModalVisible(false);
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
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
        return true;
    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("User Updated Succesfully");
            dispatch({ type: UPDATE_USER_RESET })
        }
        if (isDeleted) {
            alert.success("User Deleted Succesfully");
            dispatch({ type: DELETE_USER_RESET })
        }
    }, [dispatch, error, isUpdated, isDeleted, alert]);


    return (
        <Fragment>

            <StyledTableRow key={user.email}>
                <StyledTableCell component="th" scope="row">
                    {user.name}
                </StyledTableCell>
                <StyledTableCell align="left">{user.email}</StyledTableCell>
                <StyledTableCell align="right">{user.phone}</StyledTableCell>
                <StyledTableCell align="right">
                    {user.type === "normal" && <Button onClick={() => setIsModalVisible(true)}>
                        <UpdateIcon />
                    </Button>}
                </StyledTableCell>
                <StyledTableCell align="right">
                    <Button onClick={handelDeleteUser}>
                        <DeleteIcon />
                    </Button>
                </StyledTableCell>
            </StyledTableRow>
            <Modal
                title="Update User"
                open={isModalVisible}
                onOk={handleUpdateSubmit}
                onCancel={handleCancelClick}
                okText="Update"
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
                    <Space>
                        <Checkbox onChange={onChange}>Reset password to Default</Checkbox>
                    </Space>
                </div>
            </Modal>
        </Fragment>
    )
}

export default Tablerow
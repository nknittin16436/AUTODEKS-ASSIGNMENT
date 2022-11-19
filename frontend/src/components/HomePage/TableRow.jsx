import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../action/userAction';
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

    const handelDeleteUser = async () => {
        dispatch(deleteUser(user.id));
    }
    return (
        <StyledTableRow key={user.email}>
            <StyledTableCell component="th" scope="row">
                {user.name}
            </StyledTableCell>
            <StyledTableCell align="right">{user.email}</StyledTableCell>
            <StyledTableCell align="right">{user.phone}</StyledTableCell>
            <StyledTableCell align="right">
                <Button>
                    <UpdateIcon />
                </Button>
            </StyledTableCell>
            <StyledTableCell align="right">
                <Button onClick={handelDeleteUser}>

                    <DeleteIcon />
                </Button>
            </StyledTableCell>
        </StyledTableRow>
    )
}

export default Tablerow
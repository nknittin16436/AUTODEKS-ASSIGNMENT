import React, { Fragment, useState, useEffect } from 'react'
import './HomePage.css'
import Navbar from './Navbar/Navbar';
import Pagination from "react-js-pagination";
import UserTable from './Table/UserTable';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../action/userAction';
import Newuser from './NewUser';

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users, totalUsers } = useSelector((state) => state.users);
    const { isAuthenticated, user, loading } = useSelector((state) => state.user);
    const { isUpdated, isDeleted, isAdded } = useSelector((state) => state.profile);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
        dispatch(getAllUsers(currentPage));
    }, [isAuthenticated, currentPage, isUpdated, isDeleted, isAdded, dispatch, navigate])

    return (
        <Fragment>
            {
                !loading
                &&
                <Fragment>
                    < div className="homepage" >
                        <Navbar user={user} />

                        <div className="add__new__user__container">
                            <Newuser />
                        </div>
                        <div className="user__table">
                            <div className="user__table__container">
                                <UserTable users={users} />
                            </div>
                        </div>


                        <div className="pagination__box" style={{margin:20}}>
                            <div className="pagination__box__container">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={6}
                                    totalItemsCount={Number(totalUsers)}
                                    onChange={(e) => setCurrentPage(e)}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPageText="1st"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    // activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                />
                            </div>
                        </div>
                    </ div>
                </Fragment >
            }
        </Fragment>
    )
}

export default HomePage
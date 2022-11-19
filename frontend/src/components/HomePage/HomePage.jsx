import React, { Fragment, useState, useEffect } from 'react'
import './HomePage.css'
import Navbar from './Navbar/Navbar';
import Pagination from "react-js-pagination";
import UserTable from './UserTable';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../action/userAction';

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users, loading: alluserLoading, totalUsers } = useSelector((state) => state.users);
    const { isAuthenticated, user, loading } = useSelector((state) => state.user);

    useEffect(() => {
        // if (!isAuthenticated) {
        //     navigate('/login');
        // }
        dispatch(getAllUsers(currentPage));
    }, [isAuthenticated,currentPage])

    return (
        <Fragment>
            <div className="homepage">
                <Navbar user={user} />
                <div className="user__table">
                    <div className="user__table__container">
                        <UserTable users={users} />
                    </div>
                </div>


                <div className="pagination__box">
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
            </div>
        </Fragment>
    )
}

export default HomePage
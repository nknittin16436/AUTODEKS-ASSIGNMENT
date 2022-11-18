import React, { Fragment, useState,useEffect } from 'react'
import './HomePage.css'
import Navbar from './Navbar/Navbar';
import Pagination from "react-js-pagination";
import UserTable from './UserTable';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state) => state.user);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated])

    return (
        <Fragment>
            <div className="homepage">

                <Navbar user={user} />

                <div className="user__table">
                    <div className="user__table__container">
                        <UserTable />
                    </div>
                </div>


                <div className="pagination__box">
                    <div className="pagination__box__container">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={5}
                            totalItemsCount={Number(20)}
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
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import './css/pagination.css';

const Pagination = ({ total, current, perPage }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');
    const totalPages = Math.ceil(total / perPage);
    const [currentPage, setCurrentPage] = useState(current);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        navigate(`/search?q=${query}&page=${pageNumber}`);
    };

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            navigate(`/search?q=${query}&page=${currentPage - 1}`);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            navigate(`/search?q=${query}&page=${currentPage + 1}`);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxDisplayedPages = 5;
        const halfDisplayedPages = Math.floor(maxDisplayedPages / 2);

        let startPage = Math.max(currentPage - halfDisplayedPages, 1);
        let endPage = startPage + maxDisplayedPages - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(endPage - maxDisplayedPages + 1, 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`page-item ${currentPage === i ? 'active' : ''}`}
                    onClick={() => handlePageClick(i)}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="pagination">
            <div className="pagination-controls">
                <button
                    className="page-item first-page"
                    onClick={() => handlePageClick(1)}
                    disabled={currentPage === 1}
                >
                    처음으로
                </button>

            </div>
            <div className="pagination-numbers">
                <button
                    className="page-item prev-page"
                    onClick={handlePrevClick}
                    disabled={currentPage === 1}
                    >
                    &laquo;
                </button>
                {renderPageNumbers()}
                <button
                    className="page-item next-page"
                    onClick={handleNextClick}
                    disabled={currentPage === totalPages}
                >
                    &raquo;
                </button>
            </div>
            <div className="pagination-controls">
                <button
                    className="page-item last-page"
                    onClick={() => handlePageClick(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    끝으로
                </button>
            </div>
        </div>
    );
};

export default Pagination;
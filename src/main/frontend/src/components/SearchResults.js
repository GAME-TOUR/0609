import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from './Pagination'; // Pagination 컴포넌트 경로를 확인하세요
import NavBar from './NavBar';
import './css/SearchResults.css';

function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [totalGames, setTotalGames] = useState(0);  // 총 게임 수 상태 추가
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const query = new URLSearchParams(location.search).get('q');
    const page = parseInt(new URLSearchParams(location.search).get('page') || '1');
    const perPage = 7;  // 페이지당 게임 수
    const [searchQuery, setSearchQuery] = useState(query || '');

    const handleSetValue = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission on enter key
            navigate(`/search?q=${searchQuery}&page=1`); // Update URL, reset to page 1 on new search
        }
    };

    useEffect(() => {
        setCurrentPage(page);
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/games`, {
                    params: { kw: query, page: page - 1, size: 10 }
                });
                setGames(response.data.content);
                setTotalGames(response.data.totalElements);  // 총 게임 수 업데이트
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch search results.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchSearchResults();
    }, [query, page]);

    if (loading) return <div><NavBar textValue={searchQuery} handleSetValue={handleSetValue} handleKeyDown={handleKeyDown} /><h2>Loading...</h2></div>;
    if (error) return <div><NavBar textValue={searchQuery} handleSetValue={handleSetValue} handleKeyDown={handleKeyDown} /><div>Error: {error}</div></div>;
    if (games.length === 0) return <div className="no-results"><NavBar textValue={searchQuery} handleSetValue={handleSetValue} handleKeyDown={handleKeyDown} /><h2>Search Results for "{query}"</h2><h5>검색결과가 없습니다.</h5></div>;

    return (
        <div className="search-results-page">
            <NavBar textValue={searchQuery} handleSetValue={handleSetValue} handleKeyDown={handleKeyDown} />
            <h2>"{query}"에 대한 검색결과입니다.</h2>
            <div className="search-results">
                {games.map(game => (
                    <div key={game.id} className="search-result-item" onClick={() => navigate(`/game/${game.id}`)}>
                        <img src={game.thumb} alt={game.title} className="search-result-image" />
                        <div className="search-result-title">{game.title}</div>
                    </div>
                ))}
            </div>
            <Pagination total={totalGames} current={currentPage} perPage={perPage} />
        </div>
    );
}

export default SearchResults;

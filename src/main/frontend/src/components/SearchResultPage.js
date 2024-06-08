import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './css/SearchResultPage.css';
import SubHeader from './SubHeader';

// 더미 게임 데이터 추가
const dummyGames = [
    { id: 1, title: "Baldur's Gate 3", description: "Story-rich, party-based RPG set in the universe of Dungeons & Dragons", rating: 9.5, imageUrl: "https://steamcdn-a.akamaihd.net/steam/apps/1086940/library_600x900_2x.jpg" },
    { id: 2, title: "PUBG: BATTLEGROUNDS", description: "Squad up and join the Battlegrounds for the original Battle Royale experience.", rating: 9.7, imageUrl: "https://steamcdn-a.akamaihd.net/steam/apps/578080/library_600x900_2x.jpg" },
    { id: 3, title: "Witcher 3: Wild Hunt", description: "Action role-playing game set in a fantasy universe.", rating: 9.9, imageUrl: "https://steamcdn-a.akamaihd.net/steam/apps/292030/library_600x900_2x.jpg" },
    { id: 4, title: "Cyberpunk 2077", description: "Open-world, action-adventure story set in Night City.", rating: 8.0, imageUrl: "https://steamcdn-a.akamaihd.net/steam/apps/1091500/library_600x900_2x.jpg" },
    { id: 5, title: "Red Dead Redemption 2", description: "Epic tale of life in America’s unforgiving heartland.", rating: 9.8, imageUrl: "https://steamcdn-a.akamaihd.net/steam/apps/1174180/library_600x900_2x.jpg" },
    { id: 6, title: "DOOM Eternal", description: "Hell’s armies have invaded Earth. Become the Slayer in an epic single-player campaign.", rating: 9.0, imageUrl: "https://steamcdn-a.akamaihd.net/steam/apps/782330/library_600x900_2x.jpg" },
    { id: 7, title: "Half-Life: Alyx", description: "Valve’s VR return to the Half-Life series.", rating: 9.6, imageUrl: "https://steamcdn-a.akamaihd.net/steam/apps/546560/library_600x900_2x.jpg" },
    { id: 8, title: "Hades", description: "Defy the god of the dead as you hack and slash out of the Underworld.", rating: 9.2, imageUrl: "https://steamcdn-a.akamaihd.net/steam/apps/1145360/library_600x900_2x.jpg" },
    { id: 9, title: "Among Us", description: "An online and local party game of teamwork and betrayal for 4-15 players.", rating: 8.5, imageUrl: "https://steamcdn-a.akamaihd.net/steam/apps/945360/library_600x900_2x.jpg" },
    { id: 10, title: "Celeste", description: "Help Madeline survive her inner demons on her journey to the top of Celeste Mountain.", rating: 9.3, imageUrl: "https://steamcdn-a.akamaihd.net/steam/apps/504230/library_600x900_2x.jpg" }
];

// 더미 리뷰 데이터 추가
const dummyReviews = [
    { username: "JohnDoe", content: "Great game with deep story!", rating: 5 },
    { username: "JaneDoe", content: "Love the graphics and gameplay!", rating: 5 },
    { username: "Alex", content: "Well made!", rating: 4 },
    { username: "Sam", content: "Not bad", rating: 4 },
    { username: "Chris", content: "Not my style", rating: 2 },
    { username: "Taylor", content: "Exceptional gameplay and graphics!", rating: 5 },
    { username: "Jordan", content: "Quite engaging and fun.", rating: 4 },
    { username: "Morgan", content: "A bit repetitive, but good.", rating: 3 },
    { username: "Riley", content: "Loved the storyline and characters.", rating: 5 },
    { username: "Casey", content: "Too many bugs.", rating: 2 }
];

const SearchResultPage = () => {

    const location = useLocation();
    const key = location.state.keyword;
    console.log(key);

    const [games, setGames] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [showMoreGames, setShowMoreGames] = useState(false);
    const [showMoreReviews, setShowMoreReviews] = useState(false);

    useEffect(() => {
        setGames(dummyGames);
        setReviews(dummyReviews);
    }, []);

    const toggleShowMoreGames = () => setShowMoreGames(!showMoreGames);
    const toggleShowMoreReviews = () => setShowMoreReviews(!showMoreReviews);

    return (
        <div className="App">
            <SubHeader />
            <div className="section">
                <h1>Search Result for {key}
                    {/* <span className="more" onClick={toggleShowMoreGames}>more..</span> */}
                </h1>
                <div className="game-list">
                    {games.slice(0, showMoreGames ? games.length : 10).map(game => (
                        <div key={game.id} className="game-item">
                            <img className="game-img" src={game.imageUrl} alt={`Cover of ${game.title}`} />
                            <div className="game-details">
                                <h2>{game.title}</h2>
                                <p>{game.description}</p>
                                <p>Rating: {game.rating}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchResultPage;

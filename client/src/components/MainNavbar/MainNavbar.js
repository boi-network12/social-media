import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import FacebookLogo from "../../assets/facebook-logo.png";
import { BiSearch, BiHome, BiTv, BiStore, BiGroup, BiGame, BiMessage, BiMenu, BiBell, BiUser } from "react-icons/bi";
import { FaBell, FaTh } from "react-icons/fa";
import "./MainNavbar.css";
import NotificationDropdown from '../../DropDown/DropdownNotification/DropdownNotification';
import MessageDropdown from '../../DropDown/MessageDropdown/MessageDropdown';
import MoreDropdown from '../../DropDown/MoreDropdown/MoreDropdown';


const MainNavbar = () => {
    const [searchFocus, setSearchFocus] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const [isMoreVisible, setIsMoreVisible] = useState(false);



    const toggleNotificationVisibility = () => setIsNotificationVisible(!isNotificationVisible);
    const toggleMessageVisibility = () => setIsMessageVisible(!isMessageVisible);
    const toggleMoreVisibility = () => setIsMoreVisible(!isMoreVisible);



    const handleSearchFocus = () => setSearchFocus(true);
    const handleSearchBlur = () => setSearchFocus(false);
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.length > 0) {
            setSuggestions([`Suggestion 1 for "${query}"`]);
        } else {
            setSuggestions([]);
        }
    };

    const toggleSearchVisibility = () => setIsSearchVisible(!isSearchVisible);

    return (
        <div className="MainNavbarContainer">
            <div className="MainNavbarLeft">
                <NavLink to={["/"]}>
                    <img src={FacebookLogo} alt="Facebook Logo" />
                </NavLink>
                <div className={`SearchContainer ${searchFocus ? 'focused' : ''}`}>
                    <BiSearch className="SearchIcon" onClick={toggleSearchVisibility} />
                    {isSearchVisible && (
                        <input
                            type="text"
                            placeholder="Search Facebook"
                            className="SearchInput"
                            value={searchQuery}
                            onFocus={handleSearchFocus}
                            onBlur={handleSearchBlur}
                            onChange={handleSearchChange}
                        />
                    )}
                </div>

                {searchQuery && searchFocus && (
                    <div className="SearchSuggestions">
                        {suggestions.length > 0 ? (
                            suggestions.map((suggestion, index) => (
                                <p key={index}>{suggestion}</p>
                            ))
                        ) : (
                            <p>No results found for "{searchQuery}"</p>
                        )}
                    </div>
                )}
            </div>

            <div className="MainNavbarCenter">
                <NavLink
                    to="/"
                    className={({ isActive }) => isActive ? "NavLink activeNavLink" : "NavLink"}
                >
                    <BiHome />
                </NavLink>
                <NavLink
                    to="/watch"
                    className={({ isActive }) => isActive ? "NavLink activeNavLink" : "NavLink"}
                >
                    <BiTv />
                </NavLink>
                <NavLink
                    to="/marketplace"
                    className={({ isActive }) => isActive ? "NavLink activeNavLink" : "NavLink"}
                >
                    <BiStore />
                </NavLink>
                <NavLink
                    to="/groups"
                    className={({ isActive }) => isActive ? "NavLink activeNavLink" : "NavLink"}
                >
                    <BiGroup />
                </NavLink>
                <NavLink
                    to="/gaming"
                    className={({ isActive }) => isActive ? "NavLink activeNavLink" : "NavLink"}
                >
                    <BiGame />
                </NavLink>
            </div>

            <div className="MainNavbarCenter inMobile">
                <NavLink
                    to="/"
                    className={({ isActive }) => isActive ? "NavLink activeNavLink" : "NavLink"}
                >
                    <BiHome />
                </NavLink>
                <NavLink
                    to="/watch"
                    className={({ isActive }) => isActive ? "NavLink activeNavLink" : "NavLink"}
                >
                    <BiTv />
                </NavLink>
                <NavLink
                    to="/friend-request"
                    className={({ isActive }) => isActive ? "NavLink activeNavLink" : "NavLink"}
                >
                    <BiUser />
                </NavLink>
                <NavLink
                    to="/message"
                    className={({ isActive }) => isActive ? "NavLink activeNavLink" : "NavLink"}
                >
                    <BiMessage />
                </NavLink>
                <NavLink
                    to="/notification"
                    className={({ isActive }) => isActive ? "NavLink activeNavLink" : "NavLink"}
                >
                    <BiBell />
                </NavLink>
                <NavLink
                    to="/menu"
                    className={({ isActive }) => isActive ? "NavLink activeNavLink" : "NavLink"}
                >
                    <BiMenu />
                </NavLink>
            </div>

            <div className="MainNavbarRight">
                <p onClick={toggleMoreVisibility}><FaTh size="20px" color='#333' /></p>
                <p onClick={toggleMessageVisibility}><BiMessage size="20px" color='#333' /></p>
                <p onClick={toggleNotificationVisibility}><FaBell size="20px" color='#333' /></p>
            </div>

            {isNotificationVisible && <NotificationDropdown />}
            {isMessageVisible && <MessageDropdown />}
            {isMoreVisible && <MoreDropdown />}
        </div>
    );
};


export default MainNavbar;

import React, { useState, useEffect, useRef } from 'react'
import './LogoSearch.css'
import Logo from '../../Img/logo.png';
import SearchIcon from '@mui/icons-material/Search';
import { getAllUser } from '../../api/UserRequest';
import { Link } from 'react-router-dom';
import { PUBLIC_FOLDER } from '../../api/config';

const LogoSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const searchRef = useRef(null);

  const serverPublic = PUBLIC_FOLDER;

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setDropdownVisible(false);
      return;
    }
    
    try {
      const { data } = await getAllUser();
      const filtered = data.filter((u) => 
        u.firstname.toLowerCase().includes(searchQuery.toLowerCase()) || 
        u.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.username && u.username.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResults(filtered);
      setDropdownVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='LogoSearch' ref={searchRef}>

      <div className="brand">
        <img src={Logo} alt="Bishal Social" className="brandLogo" />
        <span className="brandName">Bishal Social</span>
      </div>

      <div className="Search" style={{ position: 'relative' }}>
        <input 
          type="text" 
          placeholder='#Search' 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className="s-icon" onClick={handleSearch} style={{ cursor: 'pointer' }}>
          <SearchIcon />
        </div>

        {/* Dropdown Results */}
        {dropdownVisible && (
          <div className="search-results-dropdown" style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            backgroundColor: '#0F111A',
            borderRadius: '1rem',
            padding: '0.5rem',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.6)',
            zIndex: 50,
            maxHeight: '300px',
            overflowY: 'auto',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {searchResults.length === 0 ? (
              <div style={{ padding: '0.5rem', color: 'var(--gray)', textAlign: 'center' }}>No users found</div>
            ) : (
              searchResults.map((user) => (
                <Link to={`/profile/${user._id}`} key={user._id} style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setDropdownVisible(false)}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease',
                  }} className="search-result-item">
                    <img 
                      src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"} 
                      alt="" 
                      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{user.firstname} {user.lastname}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>@{user.username}</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}

      </div>

    </div>
  )
}

export default LogoSearch

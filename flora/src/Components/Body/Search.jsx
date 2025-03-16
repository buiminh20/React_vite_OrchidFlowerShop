import React, { useState, useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const Search = ({ onSearchChange, onCategoryFilterChange }) => {
  const [searchText, setSearchText] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 576);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    onSearchChange(text);
  };

  const handleCategoryClick = (category) => {
    const newCategory = category === selectedCategory ? null : category;
    setSelectedCategory(newCategory);
    onCategoryFilterChange(newCategory);
  };

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center mb-3"
      style={{
        flexDirection: isMobile ? 'column' : 'row',
        textAlign: isMobile ? 'center' : 'left',
      }}
    >
      <InputGroup className={isMobile ? 'w-100' : 'w-50'}>
        <div
          style={{
            overflow: 'hidden',
            maxWidth: showSearchInput ? (isMobile ? '100%' : '300px') : '0',
            transition: 'max-width 0.3s ease-out, padding 0.3s ease-out',
            padding: showSearchInput ? '0 10px' : '0',
          }}
        >
          <Form.Control
            type="text"
            placeholder="Search by name"
            value={searchText}
            onChange={handleSearchChange}
            style={{
              width: '100%',
              transition: 'width 0.3s ease-out',
            }}
          />
        </div>
        <InputGroup.Text onClick={toggleSearchInput} style={{ cursor: 'pointer' }}>
          <FaSearch />
        </InputGroup.Text>
      </InputGroup>

      <div
        className="d-flex align-items-center"
        style={{
          flexDirection: isMobile ? 'column' : 'row',
          marginTop: isMobile ? '10px' : '0',
        }}
      >
        <span className="me-2" style={{ marginBottom: isMobile ? '5px' : '0' }}>
          Filter by Category:
        </span>
        {['Dendrobium', 'Cattleya', 'Brassavola'].map((category) => (
          <button
            key={category}
            className={`btn btn-sm ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
            style={{
              marginRight: !isMobile ? '5px' : '0',
              marginBottom: isMobile ? '5px' : '0',
              width: isMobile ? '100%' : 'auto',
            }}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Search;

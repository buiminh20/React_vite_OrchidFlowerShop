import React, { useEffect, useState } from 'react';

import { FaRegSun, FaMoon } from "react-icons/fa";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('light'); // Mặc định là chế độ sáng

  // Tải theme từ localStorage khi component được mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  // Hàm áp dụng theme đã chọn, dùng thuộc tính data-bs-theme
  const applyTheme = (selectedTheme) => {
    document.body.setAttribute('data-bs-theme', selectedTheme);
    localStorage.setItem('theme', selectedTheme); // Lưu theme vào localStorage
    setTheme(selectedTheme); // Cập nhật state
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-light dropdown-toggle d-flex align-items-center"
        type="button"
        id="themeDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <p className="me-2" />
        {theme === 'dark' ? <FaMoon /> : <FaRegSun />}
      </button>
      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="themeDropdown">
        <li>
          <button className="dropdown-item d-flex align-items-center" onClick={() => applyTheme('light')}>
            <FaRegSun className="me-2" /> Light mode
          </button>
        </li>
        <li>
          <button className="dropdown-item d-flex align-items-center" onClick={() => applyTheme('dark')}>
            <FaMoon className="me-2" /> Dark mode
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ThemeSwitcher;
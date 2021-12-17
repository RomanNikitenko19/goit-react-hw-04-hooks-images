import { useState } from "react";
import PropTypes from "prop-types";
import style from "./Searchbar.module.css";

const Searchbar = ({ addDataForRequest }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const handelSubmit = (event) => {
    event.preventDefault();
    
    if (searchValue.trim() === "") return;

    addDataForRequest(searchValue.toLowerCase());
    setSearchValue("");
  };
  return (
    <>
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={handelSubmit}>
          <button className={style.SearchForm_button} type="submit">
            <span className={style.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={style.SearchForm_input}
            onChange={handleChange}
            value={searchValue}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
};

Searchbar.propTypes = {
  addDataForRequest: PropTypes.func.isRequired,
};
export default Searchbar;

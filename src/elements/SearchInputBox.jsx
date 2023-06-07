import React from "react";
import Form from "react-bootstrap/Form";

const SearchInputBox = ({ onChnageSearchHandler }) => {
  return (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search..."
        aria-label="Search"
        onChange={onChnageSearchHandler}
      />
    </Form>
  );
};

export default SearchInputBox;

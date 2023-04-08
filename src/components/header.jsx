import React, { Component, createRef } from "react";
import { newsCategory } from "../news";

class Header extends Component {

  state = {
    searchTerm: "",
  };

  searchBarRef = createRef()

  componentDidMount(){
    this.searchBarRef.current.focus()
  }

  hanldeChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { category, changeCategory, handleSearch } = this.props;
    return (
      <div className="my-4">
        <h1 className="mb-4" style={{ fontWeight: "300" }}>
          Block Bluster Headlines
        </h1>
        <input
          ref={this.searchBarRef}
          type="search"
          className="form-control"
          placeholder="Type anything & press Enter to search"
          onChange={this.hanldeChange}
          value={this.state.searchTerm}
          onKeyPress={(e)=>{
            if (e.key === 'Enter') {
              handleSearch(this.state.searchTerm)
            }
          }}
        />
        <div className="my-4">
          {newsCategory &&
            Object.keys(newsCategory).map((item) => {
              return (
                <button
                  className={
                    category === newsCategory[item]
                      ? `btn btn-sm btn-warning me-2 mb-2`
                      : `btn btn-sm btn-light me-2 mb-2`
                  }
                  onClick={() => changeCategory(newsCategory[item])}
                >{`#${newsCategory[item]}`}</button>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Header;

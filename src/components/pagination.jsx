import React, { Component } from "react";

class Pagination extends Component {
  state = {
    isEditable: false,
  };

  render() {
    const {
      next,
      prev,
      isPrev,
      isNext,
      currentPage,
      totalPage,
      handleChange,
      gotToPage,
    } = this.props;
    return (
      <div className="d-flex my-5 align-items-center">
        <button
          className="btn btn-warning"
          disabled={!isPrev}
          onClick={() => {
            prev();
          }}
        >
          Previous
        </button>
        <div className="flex-grow-1 text-center">
          {this.state.isEditable ? (
            <input
              type="number"
              value={currentPage}
              onChange={(e) => handleChange(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  gotToPage();
                  this.setState({ isEditable: false });
                }
              }}
            />
          ) : (
            <p
              style={{ userSelect: "none", lineHeight: "1.1" }}
              title="Double tap to jump page"
              onDoubleClick={() =>
                this.setState({ isEditable: !this.state.isEditable })
              }
            >
              {currentPage} of {totalPage}
              <br />
              <small>Double Tap to Edit</small>
            </p>
          )}
        </div>
        <button
          className="btn btn-warning ms-auto"
          disabled={!isNext}
          onClick={() => {
            next();
          }}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Pagination;

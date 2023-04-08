import React, { Component, createRef } from "react";
import Header from "./components/header";
import News, { newsCategory } from "./news";
import NewsList from "./components/newsList";
import Pagination from "./components/pagination";
import Loading from "./components/loading";

const news = new News(newsCategory.technology);

class App extends Component {
  state = {
    data: {},
    isLoading: true,
  };

  aboutResult = createRef();

  goToTop = () => {
    window.scroll(0, this.aboutResult.current.scrollTop)
    
  };

  componentDidMount() {
    news
      .getNews()
      .then((data) => this.setState({ data, isLoading: false }))
      .catch((e) => {
        console.log(e);
        alert("Something Went Wrong");
        this.setState({ isLoading: false });
      });
  }

  next = () => {
    if (this.state.data.isNext) {
      this.setState({ isLoading: true });
    }
    news
      .next()
      .then((data) => this.setState({ data, isLoading: false }))
      .catch((e) => {
        console.log(e);
        alert("Something Went Wrong");
        this.setState({ isLoading: false });
      });
  };

  prev = () => {
    if (this.state.data.isPrev) {
      this.setState({ isLoading: true });
    }
    news
      .prev()
      .then((data) => this.setState({ data, isLoading: false }))
      .catch((e) => {
        console.log(e);
        alert("Something Went Wrong");
        this.setState({ isLoading: false });
      });
  };

  changeCategory = (category) => {
    this.setState({ isLoading: true });
    news
      .changeCategory(category)
      .then((data) => this.setState({ data, isLoading: false }))
      .catch((e) => {
        console.log(e);
        alert("Something Went Wrong");
        this.setState({ isLoading: false });
      });
  };

  handleChange = (value) => {
    this.setState({ data: { ...this.state.data, currentPage: value } });
  };

  gotToPage = () => {
    this.setState({ isLoading: true });
    news
      .setCurrentPage(this.state.data.currentPage)
      .then((data) => this.setState({ data, isLoading: false }))
      .catch((e) => {
        console.log(e);
        alert("Something Went Wrong");
        this.setState({ isLoading: false });
      });
  };

  handleSearch = (term) => {
    this.setState({ isLoading: true });
    news
      .search(term)
      .then((data) => this.setState({ data, isLoading: false }))
      .catch((e) => {
        console.log(e);
        alert("Something Went Wrong");
        this.setState({ isLoading: false });
      });
  };

  render() {
    const {
      articles,
      isNext,
      isPrev,
      currentPage,
      totalPage,
      totalResults,
      category,
    } = this.state.data;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-md-3">
            <Header
              category={category}
              changeCategory={this.changeCategory}
              handleSearch={this.handleSearch}
            />
            <div ref={this.aboutResult} className="d-flex">
              <p className="text-black-50">
                About {totalResults} results found
              </p>
              <p className="text-black-50 ms-auto">
                {currentPage} page of {totalPage}
              </p>
            </div>
            {this.state.isLoading ? (
              <Loading />
            ) : (
              <>
                <NewsList news={articles} />
                <Pagination
                  next={this.next}
                  prev={this.prev}
                  isPrev={isPrev}
                  isNext={isNext}
                  currentPage={currentPage}
                  totalPage={totalPage}
                  handleChange={this.handleChange}
                  gotToPage={this.gotToPage}
                />
                <div className="d-flex justify-content-center align-items-center my-3">
                  <button
                    className="btn btn-secondary text-center"
                    onClick={this.goToTop}
                  >
                    Go To Top
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

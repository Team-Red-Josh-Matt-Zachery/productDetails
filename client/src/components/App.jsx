import React, { Component } from 'react';
import ProductDetails from './productDetails/ProductDetails';
import MainCarousel from './carousel/MainCarousel';
import Description from './Description';
import Thumbnails from './Thumbnails';
import Checklist from './Checklist';
import Modal from './Modal';

class App extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
      reviews: [],
      results: [],
      activeResult: [],
      currentStyle: 0,
      currentProduct: 4,
      averageRating: 0,
      starPercentage: 0,
      modal: false,
      modalInfo: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    // this.toggleStar = this.toggleStar.bind(this);
  }

  componentDidMount() {
    this.getProductData();
    this.getReviewData();
    this.getProductImages();
  }

  getProductData() {
    const { currentProduct } = this.state;
    fetch('http://52.26.193.201:3000/products/list')
      .then((res) => res.json())
      .then((data) => this.setState({ products: data[currentProduct - 1] }));
  }

  getReviewData() {
    const { currentProduct } = this.state;
    fetch(`http://52.26.193.201:3000/reviews/${currentProduct}/list`)
      .then((res) => res.json())
      .then((data) => this.setState({ reviews: data.results }))
      .then(() => this.averageStarRating());
  }

  getProductImages() {
    const { currentStyle, currentProduct } = this.state;
    fetch(`http://52.26.193.201:3000/products/${currentProduct}/styles/`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          results: data.results,
          activeResult: data.results[currentStyle],
        });
      });
  }

  // selectModal(info) {
  //   this.setState({ modal: !this.state.modal });
  // }

  selectModal(info = '') {
    this.setState({
      modal: !this.state.modal,
      modalInfo: info,
    }); // true/false toggle
  }

  averageStarRating() {
    const { reviews } = this.state;
    let ratingSum = 0;
    reviews.map((review) => {
      ratingSum += review.rating;
    });
    if (ratingSum) {
      const averageRating = ratingSum / reviews.length;
      const starPercentage = (averageRating / 5) * 100;
      this.setState({
        starPercentage,
        averageRating,
      });
    }
  }

  handleChange(e, style) {
    e.preventDefault();
    this.setState({ activeResult: style });
  }

  handleKeyPress(e, style) {
    e.preventDefault();
    this.setState({ activeResult: style });
  }

  // toggleStar(x) {
  //   x.classList.toggle('bi-star-fill');
  // }

  // toggleStar(e) {
  //   const tgt = e.target.firstElementChild;
  //   tgt.classList.toggle('bi-star-fill');
  //   tgt.classList.toggle('bi-star');
  // }

  // toggleStar(e) {
  //   const icon = document.getElementById('favoriteButton');
  //   if (icon.classList.contains('bi bi-star-fill')) {
  //     icon.classList.remove('bi bi-star-fill');
  //     icon.classList.add('bi bi-star');
  //   } else {
  //     icon.classList.remove('bi bi-star');
  //     icon.classList.add('bi bi-star-fill');
  //   }
  // }

  render() {
    const {
      reviews,
      products,
      results,
      activeResult,
      averageRating,
      starPercentage,
      modalInfo,
      modal,
    } = this.state;

    console.log(
      'results',
      results,
      'app actdiveResult',
      activeResult,
      'products',
      products,
      'reviews',
      reviews,
    );
    return (
      <div className="container-fluid mb-5">
        <div className="jumbotron jumbotron-fluid">
          <div className="container-fluid" />
        </div>
        <div className="row">
          <div className="d-none d-xl-block col-xl-2" />
          <div className="col-xl-1 d-none d-xl-block">
            <Thumbnails activeResult={activeResult.photos} />
          </div>
          <div className="col-sm">
            <MainCarousel
              photos={activeResult.photos}
              selectModal={this.selectModal}
              modal={modal}
              modalInfo={modalInfo}
            />
          </div>
          <div className="col-xl-3">
            <ProductDetails
              handleChange={this.handleChange}
              toggleStar={this.toggleStar}
              products={products}
              reviews={reviews}
              activeResult={activeResult}
              results={results}
              starPercentage={starPercentage}
              averageRating={averageRating}
              averageStarRating={this.averageStarRating}
            />
          </div>
          <div className="d-none d-xl-block col-xl-2" />
        </div>
        <div className="row">
          <div className="d-none d-xl-block col-xl-2" />
          <div className="col-sm-1" />
          <div className="col-sm mt-5">
            <Description products={products} />
          </div>
          <div className="col-sm-3 mt-5">
            <Checklist />
          </div>
          <div className="d-none d-xl-block col-xl-2" />
        </div>
        <div className="model">
          {/* <Modal
            displayModal={modal}
            closeModal={this.selectModal}
            modalInfo={modalInfo}
          /> */}
        </div>
      </div>
    );
  }
}

export default App;

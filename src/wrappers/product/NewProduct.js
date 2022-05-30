import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import SectionTitle from "../../components/section-title/SectionTitle";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import WebService from "../../util/webService";
import constant from "../../util/constant";
import { setLoader } from "../../redux/actions/loaderActions";
import { multilanguage } from "redux-multilanguage";
import { connect } from "react-redux";
import "./NewProduct.scss";

const AutoplaySlider = withAutoplay(AwesomeSlider);
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const NewProduct = ({
  setLoader,
  spaceTopClass,
  spaceBottomClass,
  products,
  category,
  containerClass,
  extraClass,
  defaultStore,
  currentLanguageCode,
}) => {
  const [featuredData, setFeaturedData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    getProductList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProductList = async () => {
    setLoader(true);
    let action =
      constant.ACTION.PRODUCT_GROUP +
      "FEATURED_ITEM?store=" +
      defaultStore +
      "&lang=" +
      currentLanguageCode;
    try {
      let response = await WebService.get(action);
      console.log("Response", response);
      if (response) {
        console.log("Response", response);
        let category = [
          { id: "", name: "All", code: "all", data: response.products },
        ];
        // let category = [response.products];
        response.products.forEach((item) => {
          if (item.categories !== null) {
            item.categories.forEach((a) => {
              console.log(a);
              let index = category.findIndex((value) => value.id === a.id);
              console.log(index);
              if (index === -1) {
                category.push({
                  id: a.description.id,
                  name: a.description.name,
                  code: a.code,
                  data: [item],
                });
              } else {
                category[index].data.push(item);
              }
            });
          }
        });
        setFeaturedData(response.products);
        setCategoryData(category);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };
  //   console.log("getProductList2", getProductList());

  return (
    <div
      className={`product-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      } ${extraClass ? extraClass : ""}`}
    >
      <div className={`${containerClass ? containerClass : "container"}`}>
        <SectionTitle
          titleText="Featured Products"
          positionClass="text-center"
        />
        <Tab.Container defaultActiveKey="all">
          {/* <Nav
            variant="pills"
            className="product-tab-list pt-30 pb-55 text-center"
          >
            {categoryData.map((value, i) => {
              return (
                <Nav.Item key={i}>
                  <Nav.Link eventKey={value.code}>
                    <h4>{value.name}</h4>
                  </Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav> */}
          <Tab.Content>
            <AutoplaySlider
              // play={true}
              cancelOnInteraction={true} // should stop playing on user interaction
              interval={6000}
              bullets={false}
            >
              {/* {categoryData.map((value, i) => {
                console.log("Value", value);
                return (
                  <Tab.Pane key={i} eventKey={value.code}>
                    <div className="row">
                      <ProductGrid
                        products={value.data}
                        type="men"
                        limit={8}
                        spaceBottomClass="mb-25"
                      />
                    </div>
                  </Tab.Pane>
                );
              })} */}
              {/* <Carousel responsive={responsive}> */}

              {/* {featuredData.map((value, i) => {
                console.log("categoryData", categoryData);
                console.log("featuredData", featuredData);
                console.log("value", value);
                return (
                  <Tab.Pane key={i} eventKey={value.code}>
                    <div className="row">
                      <img
                        className="imageNew"
                        alt=""
                        draggable={true}
                        // style={{ width: "50%", height: "50%" }}
                        key={i}
                        src={value.image.imageUrl}
                      />
                    </div>
                  </Tab.Pane>
                );
              })} */}
              <div data-src="assets/img/banner/unsplash1.jpg" />
              <div data-src="assets/img/banner/unsplash2.jpg" />
              <div data-src="assets/img/banner/unsplash3.jpg" />
              <div data-src="assets/img/banner/unsplash4.jpg" />
              <div data-src="assets/img/banner/unsplash5.jpg" />
              {/* </Carousel> */}
            </AutoplaySlider>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};

NewProduct.propTypes = {
  category: PropTypes.string,
  containerClass: PropTypes.string,
  extraClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  setLoader: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    currentLanguageCode: state.multilanguage.currentLanguageCode,
    defaultStore: state.merchantData.defaultStore,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: (value) => {
      dispatch(setLoader(value));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(multilanguage(NewProduct));
// export default TabProductNine;

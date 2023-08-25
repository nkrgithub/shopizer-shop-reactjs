import React from "react";
// import PropTypes from "prop-types";
// import HeroSliderStatic from "../../components/hero-slider/HeroSliderStatic.js";
import { multilanguage } from "redux-multilanguage";
import { connect } from "react-redux";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const HeroSlider = ({ string }) => {
  return (
    <AutoplaySlider
      play={true}
      cancelOnInteraction={false} // should stop playing on user interaction
      interval={6000}
    >
      {/* <div className="site-blocks-cover">
        <div className="container"> 
       <HeroSliderStatic 
        // pitch1={string["Pitch1"]}
        // pitch2={string["Pitch2"]}
        // pitch3={string["Shop now"]}
        // source="assets/img/promo/promo.png"
        // source="assets/img/slider/slider-12.jpg"
      />
       </div>
      </div> */}
      <div data-src="assets/img/promo/promo.png" />
      <div data-src="assets/img/slider/slider-12.jpg" />
      <div data-src="assets/img/slider/slidebar3.jpg" />
      {/* <div data-src="assets/img/banner/table.png" /> */}
      <div data-src="assets/img/slider/slidebar2.jpg" />
    </AutoplaySlider>
  );
};

const mapStateToProps = (state) => {
  return {
    currentLanguageCode: state.multilanguage.currentLanguageCode,
    defaultStore: state.merchantData.defaultStore,
    isLoading: state.loading.isLoading,
  };
};

export default connect(mapStateToProps)(multilanguage(HeroSlider));

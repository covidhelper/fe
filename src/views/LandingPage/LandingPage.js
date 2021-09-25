import React from "react";
import { Link } from "react-router-dom";
import CoverImage from "../../assets/images/cover-image.svg";

const LandingPage = () => {
  return (
    <div className="layout-wrapper">
      <div className="landing-container">
        <div className="content">
          <div className="heading">
            This is a community initiative to curate verified listing of covid
            resources.
          </div>
          <div className="sub-heading">
            There’s a flood of information available about the
            suppliers/providers/helpers on social media. We aim to curate a
            verifiable listing for bridging the gap between seekers and givers.
          </div>
          <div className="cta">
            <Link to="/get-info">
              <button className="btn">Get Info</button>
            </Link>
            <Link to="/add-info">
              <button className="btn">Add Info</button>
            </Link>
          </div>
        </div>
        <div className="image">
          <img src={CoverImage} alt="Cover Image" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

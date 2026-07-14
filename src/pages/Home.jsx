import React from "react";

import Hero from "../components/sections/Hero";
import BrandStory from "../components/sections/BrandStory/BrandStory";
import FeaturedCategories from "../components/sections/FeaturedCategories/FeaturedCategories";
import SignatureCollection from "../components/sections/SignatureCollection/SignatureCollection";
import ChefRecommendation from "../components/sections/ChefRecommendation/ChefRecommendation";
import WhyCraveora from "../components/sections/WhyCraveora/WhyCraveora";
import Testimonials from "../components/sections/Testimonials/Testimonials";
import Newsletter from "../components/sections/Newsletter/Newsletter";

const Home = () => {
  return (
    <div>
      <Hero />
      <BrandStory />
      <FeaturedCategories />
      <SignatureCollection />
      <ChefRecommendation />
      <WhyCraveora />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;


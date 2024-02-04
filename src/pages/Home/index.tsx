// Home.tsx

import React from "react";

import Page from "../../components/Page";
import PrimarySearchAppBar from "../../components/Title";
import SimpleBottomNavigation from "../../components/Footer";

const Home: React.FC = () => {
  return (
    <div className="Home">
      <Page
        header={<PrimarySearchAppBar />}
        footer={<SimpleBottomNavigation />}
      >
        content
      </Page>
    </div>
  );
};

export default Home;

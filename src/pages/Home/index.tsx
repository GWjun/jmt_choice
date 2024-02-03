// Home.tsx

import React from "react";

import Page from "../../components/Page";
import Title from "../../components/Title";

const Home: React.FC = () => {
  return (
    <div className="Home">
      <Page
        header={
          <>
            <Title>JMT</Title>
          </>
        }
        footer="footer"
      >
        content
      </Page>
    </div>
  );
};

export default Home;

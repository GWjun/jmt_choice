// Store.tsx

import React from "react";
import { useParams } from "react-router-dom";

import Page from "../../components/Page";
import Title from "../../components/Title";

const Store: React.FC = () => {
  const { id } = useParams();

  return (
    <Page header={<Title />}>
      <div>{id}</div>
    </Page>
  );
};

export default Store;

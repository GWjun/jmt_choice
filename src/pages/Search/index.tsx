// Search.tsx

import React from "react";
import { useParams } from "react-router-dom";

import Page from "../../components/Page";
import Title from "../../components/Title";
import SearchList from "./SearchList";

import "./Search.css";

const Search: React.FC = () => {
  const { name } = useParams();

  return (
    <Page header={<Title initValue={name} initMenu={true} />}>
      <SearchList searchKeyword={name} />
    </Page>
  );
};

export default Search;

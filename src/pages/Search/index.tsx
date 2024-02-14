import React from "react";
import { useParams } from "react-router-dom";

import Page from "../../components/Page";
import Title from "../../components/Title";
import SearchList from "../../components/SearchList";

const Search: React.FC = () => {
  const { name } = useParams();
  console.log(name);

  return (
    <Page header={<Title />}>
      <SearchList searchKeyword={name} />
    </Page>
  );
};

export default Search;

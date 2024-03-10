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
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        <SearchList searchKeyword={name} />
      </div>
    </Page>
  );
};

export default Search;

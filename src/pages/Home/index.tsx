// Home.tsx

import React, { ReactNode, useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";

import Page from "../../components/Page";
import PrimarySearchAppBar from "../../components/Title";
import SimpleBottomNavigation from "../../components/Footer";
import BoxMenu from "../../components/BoxMenu";

import Grid from "@mui/material/Unstable_Grid2";

const { kakao } = window;

const Home: React.FC = () => {
  const { setAddress } = useAppContext();
  const [selectedItem, setSelectedItem] = useState<number>(1);

  const handleItemChange = (newValue: number) => {
    setSelectedItem(newValue);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // 위치 정보를 성공적으로 가져왔을 때
          const { latitude, longitude } = position.coords;

          let geocoder = new kakao.maps.services.Geocoder();
          let coord = new kakao.maps.LatLng(latitude, longitude);
          let callback = function (result: any, status: any) {
            if (status === kakao.maps.services.Status.OK) {
              const arr = { ...result };
              const _arr = arr[0].address;
              const simple =
                _arr.region_2depth_name + " " + _arr.region_3depth_name;
              setAddress({
                coord: [latitude, longitude],
                simple: simple,
                full: _arr.address_name,
              });
              const expire = new Date().setMinutes(
                new Date().getMinutes() + 10
              );
              localStorage.setItem(
                "myAddress",
                JSON.stringify({
                  coord: [latitude, longitude],
                  simple: simple,
                  full: _arr.address_name,
                  expire: expire,
                })
              );
            }
          };
          geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
        },
        (error) => {
          // 위치 정보를 가져오는 데 실패했을 때
          console.error("Error getting location:", error);
        }
      );
    } else {
      // Geolocation API를 지원하지 않을 때
      console.error("Geolocation is not supported by your browser");
    }
  };

  const renderMainContent = (): ReactNode => {
    switch (selectedItem) {
      case 0:
        return <div>최근목록 내용</div>;
      case 1:
        return (
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
            }}
            container
          >
            <BoxMenu
              nav="/map"
              width="40%"
              height={200}
              title="지도"
              comment="지도에서 보기"
            />
            <BoxMenu
              nav="/choice"
              width="40%"
              height={200}
              title="추천"
              comment="메뉴 추천 받기"
            />
            <BoxMenu
              nav="/notfound"
              width="calc(80% + 30px)"
              height={120}
              title="무야호"
              comment="무야호"
            />
          </Grid>
        );
      case 2:
        return <div>즐겨찾기 내용</div>;
      default:
        return <div></div>;
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("myAddress");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (new Date(parsedData.expire) < new Date()) getLocation();
    } else {
      getLocation();
    }
  }, []);

  return (
    <div className="Home">
      <Page
        header={<PrimarySearchAppBar />}
        footer={
          <SimpleBottomNavigation
            value={selectedItem}
            onChange={handleItemChange}
          />
        }
      >
        {renderMainContent()}
      </Page>
    </div>
  );
};

export default Home;

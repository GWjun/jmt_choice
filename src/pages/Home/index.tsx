// Home.tsx

import React, { useEffect } from "react";

import Page from "../../components/Page";
import PrimarySearchAppBar from "../../components/Title";
import SimpleBottomNavigation from "../../components/Footer";
import { useAppContext } from "../../context/AppContext";

const { kakao } = window;

const Home: React.FC = () => {
  const { setAddress } = useAppContext();

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
        footer={<SimpleBottomNavigation />}
      >
        content
      </Page>
    </div>
  );
};

export default Home;

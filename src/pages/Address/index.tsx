// Address.tsx

import React, { useEffect, useRef } from "react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

import Page from "../../components/Page";
import Titile from "../../components/Title";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const { kakao } = window;

const Address: React.FC = () => {
  const { address, setAddress } = useAppContext();
  const previous = useRef({});
  const navigate = useNavigate();

  const handleClickOn = () => {
    navigate("/");
  };
  const handleClickOff = () => {
    setAddress(previous.current as any);
    navigate("/");
  };

  const buttons = (
    <Stack direction="row" spacing={0.2} sx={{ width: "100%", height: "50px" }}>
      <Button
        onClick={handleClickOff}
        variant="contained"
        color="secondary"
        sx={{ width: "50%" }}
      >
        취소하기
      </Button>
      <Button
        onClick={handleClickOn}
        variant="contained"
        color="success"
        sx={{ width: "50%" }}
      >
        표시한 곳으로 설정
      </Button>
    </Stack>
  );

  useEffect(() => {
    const storedData = localStorage.getItem("myAddress") || "";
    const parsedData = JSON.parse(storedData);
    previous.current = parsedData;

    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(address.coord[0], address.coord[1]),
      level: 3,
    };
    const map = new kakao.maps.Map(mapContainer, mapOption);

    const marker = new kakao.maps.Marker({
      position: map.getCenter(),
    });
    marker.setMap(map);

    kakao.maps.event.addListener(map, "click", function (mouseEvent: any) {
      const latlng = mouseEvent.latLng;
      marker.setPosition(latlng);

      const newLat = latlng.getLat();
      const newLng = latlng.getLng();
      let geocoder = new kakao.maps.services.Geocoder();
      let coord = new kakao.maps.LatLng(newLat, newLng);
      let callback = function (result: any, status: any) {
        if (status === kakao.maps.services.Status.OK) {
          const arr = { ...result };
          const _arr = arr[0].address;
          const simple =
            _arr.region_2depth_name + " " + _arr.region_3depth_name;
          setAddress({
            coord: [newLat, newLng],
            simple: simple,
            full: _arr.address_name,
          });
          const expire = new Date().setMinutes(new Date().getMinutes() + 5);
          localStorage.setItem(
            "myAddress",
            JSON.stringify({
              coord: [newLat, newLng],
              simple: simple,
              full: _arr.address_name,
              expire: expire,
            })
          );
        }
      };
      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    });
  }, [setAddress]);

  return (
    <Page header={<Titile />} footer={buttons}>
      <div id="map" style={{ width: "100%", height: "600px" }} />
    </Page>
  );
};

export default Address;

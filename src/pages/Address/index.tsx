// Address.tsx

import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const { kakao } = window;

const Address: React.FC = () => {
  const { address, setAddress } = useAppContext();
  const [newCoord, setNewCoord] = useState<number[]>([]);
  const navigate = useNavigate();

  const handleClick = () => {
    let geocoder = new kakao.maps.services.Geocoder();
    let coord = new kakao.maps.LatLng(newCoord[0], newCoord[1]);
    let callback = function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        const arr = { ...result };
        const _arr = arr[0].address;
        const simple = _arr.region_2depth_name + " " + _arr.region_3depth_name;
        setAddress({
          coord: [newCoord[0], newCoord[1]],
          simple: simple,
          full: _arr.address_name,
        });
        const expire = new Date().setMinutes(new Date().getMinutes() + 10);
        localStorage.setItem(
          "myAddress",
          JSON.stringify({
            coord: [newCoord[0], newCoord[1]],
            simple: simple,
            full: _arr.address_name,
            expire: expire,
          })
        );
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    navigate("/");
  };

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new (window as any).kakao.maps.LatLng(
        address.coord[0],
        address.coord[1]
      ),
      level: 3,
    };
    const map = new (window as any).kakao.maps.Map(mapContainer, mapOption);

    const marker = new (window as any).kakao.maps.Marker({
      position: map.getCenter(),
    });
    marker.setMap(map);

    (window as any).kakao.maps.event.addListener(
      map,
      "click",
      function (mouseEvent: any) {
        const latlng = mouseEvent.latLng;
        marker.setPosition(latlng);
        setNewCoord([latlng.getLat(), latlng.getLng()]);
      }
    );
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "500px" }}></div>
      <button onClick={handleClick}>표시한 곳으로 설정</button>
    </div>
  );
};

export default Address;

import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
// import { supabase } from "../../utils/supabaseClient";

import Page from "../../components/Page";
import Title from "../../components/Title";

const { kakao } = window;

const Map: React.FC = () => {
  const { address } = useAppContext();

  useEffect(() => {
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(address.coord[0], address.coord[1]),
      level: 2,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    const ps = new kakao.maps.services.Places(map);

    const placesSearchCB = (data: any, status: any, pagination: any) => {
      // data.forEach(async (it: Store) => {
      //   const newData: Store = {
      //     id: it.id,
      //     place_name: it.place_name,
      //     address_name: it.address_name,
      //     x: it.x,
      //     y: it.y,
      //     category_name: it.category_name,
      //     phone: it.phone,
      //     place_url: it.place_url,
      //   };
      //   const { data, error } = await supabase.from(`stores`).upsert([newData]);
      //   if (error) console.log(error);
      // });

      if (status === kakao.maps.services.Status.OK) {
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
        }
      }
    };

    const displayMarker = (place: any) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(
          '<a href="/store/' +
            place.id +
            '" style="padding:5px; font-size:13px; text-decoration:none; color:#4285f4;">' +
            place.place_name +
            "</a>"
        );

        infowindow.open(map, marker);
      });
    };

    const searchPlaces = () => {
      const center = map.getCenter();
      const level = map.getLevel();

      ps.categorySearch("FD6", placesSearchCB, {
        useMapBounds: true,
        location: center,
        radius: level * 75,
      });
    };

    // 지도의 dragend와 zoom_changed 이벤트에 searchPlaces 함수를 연결
    kakao.maps.event.addListener(map, "dragend", searchPlaces);
    kakao.maps.event.addListener(map, "zoom_changed", searchPlaces);

    // 초기 검색 수행
    searchPlaces();
  }, [address.coord]);

  return (
    <Page header={<Title />}>
      <div id="map" style={{ width: "100%", height: "100%" }} />
    </Page>
  );
};

export default Map;

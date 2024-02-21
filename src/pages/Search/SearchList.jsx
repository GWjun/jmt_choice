import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

const { kakao } = window;

const SearchList = ({ searchKeyword }) => {
  const { address } = useAppContext();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const [infowindow, setInfowindow] = useState(null);

  useEffect(() => {
    const newInfowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    setInfowindow(newInfowindow);

    searchPlaces();

    return () => {
      removeAllChildNodes(document.getElementById("placesList"));
      removeMarker();
    };
  }, []);

  const searchPlaces = () => {
    const keyword = searchKeyword;
    const center = new kakao.maps.LatLng(address.coord[0], address.coord[1]);
    const radius = 2000;

    const ps = new kakao.maps.services.Places();
    const options = {
      location: center,
      radius: radius,
    };

    ps.keywordSearch(keyword, placesSearchCB, options);
  };

  const placesSearchCB = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      displayPlaces(data);
      displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      // 검색 결과가 없을 때 메시지를 표시합니다.
      const listEl = document.getElementById("placesList");
      removeAllChildNodes(listEl);
      listEl.innerHTML =
        '<li class="no-results">검색 결과가 존재하지 않습니다.</li>';
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
    }
  };

  const displayPlaces = (places) => {
    const listEl = document.getElementById("placesList");
    const bounds = new kakao.maps.LatLngBounds();

    removeAllChildNodes(listEl);
    removeMarker();

    places.forEach((place, index) => {
      const placePosition = new kakao.maps.LatLng(place.y, place.x);
      const marker = addMarker(placePosition, index);
      const itemEl = getListItem(index, place);

      bounds.extend(placePosition);

      attachMarkerEvents(marker, itemEl);

      listEl.appendChild(itemEl);
    });

    if (map) {
      map.setBounds(bounds);
    }
  };

  const attachMarkerEvents = (marker, itemEl) => {
    const displayInfowindowHandler = () => {
      displayInfowindow(marker, itemEl.innerText);
    };

    kakao.maps.event.addListener(marker, "mouseover", displayInfowindowHandler);
    itemEl.addEventListener("mouseover", displayInfowindowHandler);

    const closeInfowindowHandler = () => {
      if (infowindow) infowindow.close();
    };

    kakao.maps.event.addListener(marker, "mouseout", closeInfowindowHandler);
    itemEl.addEventListener("mouseout", closeInfowindowHandler);
  };

  const addMarker = (position, idx) => {
    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
    const imageSize = new kakao.maps.Size(36, 37);
    const imgOptions = {
      spriteSize: new kakao.maps.Size(36, 691),
      spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
      offset: new kakao.maps.Point(13, 37),
    };
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imgOptions
    );
    const marker = new kakao.maps.Marker({
      position: position,
      image: markerImage,
    });

    marker.setMap(map);
    setMarkers((prevMarkers) => [...prevMarkers, marker]);

    return marker;
  };

  const removeMarker = () => {
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    setMarkers([]);
  };

  const displayInfowindow = (marker, title) => {
    if (infowindow) {
      const content = `<div style="padding:5px;z-index:1;">${title}</div>`;
      infowindow.setContent(content);
      infowindow.open(map, marker);
    }
  };

  const displayPagination = (pagination) => {
    const paginationEl = document.getElementById("pagination");
    removeAllChildNodes(paginationEl);

    for (let i = 1; i <= pagination.last; i++) {
      const el = document.createElement("a");
      el.href = "#";
      el.innerHTML = i;

      if (i === pagination.current) {
        el.className = "on";
      } else {
        el.onclick = () => {
          pagination.gotoPage(i);
        };
      }

      paginationEl.appendChild(el);
    }
  };

  const getListItem = (index, place) => {
    const el = document.createElement("li");
    let itemStr =
      `<span class="markerbg marker_${index + 1}"></span>` +
      '<div class="info">' +
      `   <h5>${place.place_name}</h5>`;

    if (place.road_address_name) {
      itemStr +=
        `    <span>${place.road_address_name}</span>` +
        `   <span class="jibun gray">${place.address_name}</span>`;
    } else {
      itemStr += `    <span>${place.address_name}</span>`;
    }

    itemStr += `  <span class="tel">${place.phone}</span>` + "</div>";

    el.innerHTML = itemStr;
    el.className = "item";

    return el;
  };

  const removeAllChildNodes = (el) => {
    while (el && el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }
  };

  return (
    <div className="map_wrap">
      <div id="menu_wrap" className="bg_white">
        <div className="option"></div>
        <ul id="placesList"></ul>
        <div id="pagination"></div>
      </div>
    </div>
  );
};

export default SearchList;

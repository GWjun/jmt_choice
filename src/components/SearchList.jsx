import React, { useState, useEffect } from "react";

const { kakao } = window;

const SearchList = ({ searchKeyword }) => {
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const [infowindow, setInfowindow] = useState(null);

  useEffect(() => {
    // Initialize infowindow
    const newInfowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    setInfowindow(newInfowindow);

    // Initial places search
    searchPlaces();

    // Cleanup on unmount
    return () => {
      removeAllChildNods(document.getElementById("placesList"));
      removeMarker();
    };
  }, []);

  // Search for places
  const searchPlaces = () => {
    const keyword = searchKeyword;

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, placesSearchCB);
  };

  // Callback for places search
  const placesSearchCB = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      displayPlaces(data);
      displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
    }
  };

  // displayPlaces 함수 수정
  const displayPlaces = (places) => {
    const listEl = document.getElementById("placesList");
    const bounds = new kakao.maps.LatLngBounds();

    removeAllChildNods(listEl);
    removeMarker();

    places.forEach((place, index) => {
      const placePosition = new kakao.maps.LatLng(place.y, place.x);
      const marker = addMarker(placePosition, index);
      const itemEl = getListItem(index, place);

      bounds.extend(placePosition);

      kakao.maps.event.addListener(marker, "mouseover", () => {
        displayInfowindow(marker, place.place_name);
      });

      kakao.maps.event.addListener(marker, "mouseout", () => {
        infowindow.close();
      });

      itemEl.onmouseover = () => {
        displayInfowindow(marker, place.place_name);
      };

      itemEl.onmouseout = () => {
        infowindow.close();
      };

      listEl.appendChild(itemEl);
    });

    // map이 null이 아닌 경우에만 setBounds 호출
    if (map) {
      map.setBounds(bounds);
    }
  };

  // Add a marker to the map
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

  // Remove all markers from the map
  const removeMarker = () => {
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    setMarkers([]);
  };

  // Display infowindow with the place name
  const displayInfowindow = (marker, title) => {
    const content = `<div style="padding:5px;z-index:1;">${title}</div>`;
    infowindow.setContent(content);
    infowindow.open(map, marker);
  };

  // Display pagination
  const displayPagination = (pagination) => {
    const paginationEl = document.getElementById("pagination");
    const fragment = document.createDocumentFragment();

    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.lastChild);
    }

    for (let i = 1; i <= pagination.last; i++) {
      const el = document.createElement("a");
      el.href = "#";
      el.innerHTML = i;

      if (i === pagination.current) {
        el.className = "on";
      } else {
        el.onclick = (() => {
          return () => {
            pagination.gotoPage(i);
          };
        })(i);
      }

      fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
  };

  // Get list item for a place
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

  // Remove all child nodes of an element
  const removeAllChildNods = (el) => {
    console.log(el);
    if (el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
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

// Home.tsx

import * as React from "react";
import { useAppContext } from "../../context/AppContext";
import { supabase } from "../../utils/supabaseClient";

import Page from "../../components/Page";
import Title from "../../components/Title";
import Footer from "../../components/Footer";
import BoxMenu from "../../components/BoxMenu";

import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

const { kakao } = window;

const Home: React.FC = () => {
  const { setAddress } = useAppContext();
  const [keywords, setKeywords] = React.useState<string[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const { data: keyword, error: keywordError } = await supabase
        .from("keyword")
        .select("*")
        .order("count", { ascending: false })
        .limit(10);

      if ((keyword || []).length > 0) {
        const newKeywords = keyword?.map((item) => item.keyword) || [];
        setKeywords(newKeywords);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
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
    const storedData = localStorage.getItem("myAddress");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (new Date(parsedData.expire) < new Date()) getLocation();
    } else {
      getLocation();
    }
  }, [setAddress]);

  return (
    <Page header={<Title />} footer={<Footer />}>
      <div
        style={{
          width: "100%",
          // display: "flex",
          // flexDirection: "column",
          // alignItems: "space-between",
          // justifyContent: "space-between",
        }}
      >
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
            height={160}
            title="지도"
            comment="지도에서 보기"
          />
          <BoxMenu
            nav="/choice"
            width="40%"
            height={160}
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
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            className="userName"
            sx={{
              color: "#333",
              fontFamily: "'Jua', sans-serif",
              padding: "5px",
              margin: "20px 0px 0px 0px",
            }}
          >
            검색순위
          </Typography>
          {keywords?.map((item, _i) => (
            <Grid
              key={_i}
              // onClick={() => navigate(`/store/${item.id}`)}
              container
              spacing={2}
              sx={{
                width: "90%",
                maxWidth: "700px",
                justifyContent: "space-between",
                backgroundColor: "#eeeeee",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
                borderRadius: "20px",
                margin: "5px",
              }}
            >
              <Grid
                key={_i}
                sx={{
                  flex: "1 auto",
                  padding: "8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  id={`transition-modal-title-${_i}`}
                  variant="h6"
                  component="h2"
                  className="userName"
                  sx={{
                    color: "#333",
                    fontFamily: "'Jua', sans-serif",
                  }}
                >
                  {_i + 1}. {item}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </div>
      </div>
    </Page>
  );
};

export default Home;

// Home.tsx

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import { useAppContext } from "../../context/AppContext";

import Page from "../../components/Page";
import Title from "../../components/Title";
import Footer from "../../components/Footer";
import BoxMenu from "../../components/BoxMenu";

import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

const { kakao } = window;

const Home: React.FC = () => {
  const { setAddress } = useAppContext();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = React.useState<number>(1);
  const [recent, setRecent] = React.useState<null | Store[]>();

  const handleItemChange = (newValue: number) => {
    setSelectedItem(newValue);
  };

  const fetchData = async () => {
    const { data: recentId, error: recentIdError } = await supabase
      .from("recent")
      .select("recent");

    let recentIds = [];
    if (recentId) {
      recentIds = recentId.map((item) => item.recent);
    }

    const { data: recentData, error: recentDataError } = await supabase
      .from("stores")
      .select("*")
      .in("id", recentIds);

    const sortedRecentData = recentIds
      .map((id) => recentData?.find((item) => item.id === id))
      .reverse();

    setRecent(sortedRecentData);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const renderMainContent = (): React.ReactNode => {
    switch (selectedItem) {
      case 0:
        return (
          <>
            <Typography
              id="transition-modal-title"
              variant="h5"
              component="h2"
              className="userName"
              sx={{
                color: "#333",
                fontFamily: "'Jua', sans-serif",
                padding: "10px",
                margin: "10px 0px 0px 10px",
              }}
            >
              최근목록
            </Typography>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {recent?.map((item, _i) => (
                <Grid
                  key={_i}
                  onClick={() => navigate(`/store/${item.id}`)}
                  container
                  spacing={2}
                  sx={{
                    width: "90%",
                    maxWidth: "700px",
                    justifyContent: "space-between",
                    backgroundColor: "#eeeeee",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
                    borderRadius: "20px",
                    margin: "10px",
                  }}
                >
                  <Grid
                    key={_i}
                    sx={{
                      flex: "1 auto",
                      padding: "10px",
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
                      {item?.place_name}
                    </Typography>
                    <Typography
                      id={`transition-modal-description-${_i}`}
                      variant="body1"
                      sx={{
                        color: "#555",
                        padding: "5px",
                        textAlign: "center",
                        fontSize: "13px",
                      }}
                    >
                      {item?.category_name}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </div>
          </>
        );
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
        );
      case 2:
        return (
          <>
            <Typography
              id="transition-modal-title"
              variant="h5"
              component="h2"
              className="userName"
              sx={{
                color: "#333",
                fontFamily: "'Jua', sans-serif",
                padding: "10px",
                margin: "10px 10px 0px 10px",
              }}
            >
              즐겨찾기
            </Typography>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid
                container
                spacing={2}
                sx={{
                  width: "90%",
                  maxWidth: "700px",
                  justifyContent: "space-between",
                  backgroundColor: "#eeeeee",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
                  borderRadius: "20px",
                  margin: "15px",
                }}
              >
                <Grid
                  sx={{
                    flex: "1 auto",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
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
                    }}
                  >
                    111
                  </Typography>
                  <Typography
                    id="transition-modal-description"
                    variant="body1"
                    sx={{
                      color: "#555",
                      padding: "5px",
                      textAlign: "center",
                      fontSize: "13px",
                    }}
                  >
                    111
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </>
        );
      default:
        return <div></div>;
    }
  };

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
    <div className="Home">
      <Page
        header={<Title />}
        footer={<Footer value={selectedItem} onChange={handleItemChange} />}
      >
        <div style={{ width: "100%" }}>{renderMainContent()}</div>
      </Page>
    </div>
  );
};

export default Home;

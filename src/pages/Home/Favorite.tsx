// Favorite.tsx

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../utils/supabaseClient";
import "../../utils/font.css";

import Page from "../../components/Page";
import Title from "../../components/Title";

import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Footer from "../../components/Footer";
import CircularProgress from "@mui/material/CircularProgress";

const Favorite = () => {
  const { auth } = useAuth();
  const [favorite, setFavorite] = React.useState<null | Store[]>();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      const { data: favoriteId, error: favoriteIdError } = await supabase
        .from("favorite")
        .select("favorite")
        .eq("email", auth[2]);

      let favoriteIds = [];
      if (favoriteId) {
        favoriteIds = favoriteId.map((item) => item.favorite);
      }

      const { data: favoriteData, error: favoriteDataError } = await supabase
        .from("stores")
        .select("*")
        .in("id", favoriteIds);

      const sortedfavoriteData = favoriteIds
        .map((id) => favoriteData?.find((item) => item.id === id))
        .reverse();

      setFavorite(sortedfavoriteData);
    };

    fetchData();
  }, []);

  return (
    <Page header={<Title />} footer={<Footer value={2} />}>
      <div style={{ width: "100%" }}>
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
          {(favorite || []).length > 0 ? (
            favorite?.map((item, _i) => (
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
            ))
          ) : (
            <CircularProgress />
          )}
        </div>
      </div>
    </Page>
  );
};

export default Favorite;

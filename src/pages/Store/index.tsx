// Store.tsx

import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../utils/supabaseClient";

import Page from "../../components/Page";
import Title from "../../components/Title";

import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import Rating from "@mui/material/Rating";

const Store: React.FC = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [store, setStore] = React.useState<Store>();
  const [starred, setStarred] = React.useState<number>(0);

  const toggleStarred = React.useCallback(async () => {
    if (starred === 0) {
      setStarred(1);
      await supabase.from(`favorite`).insert([
        {
          favorite: id,
          store_name: store?.place_name || "notthing",
          name: auth[1],
          email: auth[2],
        },
      ]);
    } else {
      setStarred(0);
      await supabase
        .from("favorite")
        .delete()
        .eq("email", auth[2])
        .eq("favorite", id);
    }
  }, [starred, store]);

  React.useEffect(() => {
    const fetchStore = async () => {
      console.log(id);
      try {
        const { data: storeData, error: storeError } = await supabase
          .from("stores")
          .select("*")
          .eq("id", id);

        if (storeData?.length) {
          setStore(storeData[0]);
        } else {
          alert("데이터에 없는 음식점 입니다.");
          navigate(-1);
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    };

    fetchStore();
  }, [id, navigate, auth]);

  React.useEffect(() => {
    const fetchFavorite = async () => {
      await supabase.from(`recent`).delete().eq("recent", id);
      const { data: favoreiteData, error: favoriteError } = await supabase
        .from(`favorite`)
        .select("*")
        .eq("email", auth[2])
        .eq("favorite", id);

      if (favoreiteData?.length) {
        setStarred(1);
      }
    };

    const fetchRecent = async () => {
      await supabase.from(`recent`).delete().eq("recent", id);
      const { data: recentData, error: recentError } = await supabase
        .from(`recent`)
        .select("*")
        .eq("email", auth[2]);

      if (recentData?.length) {
        if (recentData?.length >= 5) {
          const oldestRow = recentData.reduce((oldest, row) =>
            row.created_at < oldest.created_at ? row : oldest
          );
          await supabase.from(`recent`).delete().eq("recent", oldestRow.recent);
        }
      }
      await supabase.from(`recent`).insert([
        {
          name: auth[1],
          email: auth[2],
          recent: id,
          store_name: store?.place_name || "notthing",
        },
      ]);
    };

    if (Object.keys(store || {}).length > 0) {
      fetchRecent();
      fetchFavorite();
    }
  }, [id, auth, store]);

  return (
    <Page header={<Title />}>
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
            <div
              style={{
                display: "flex",
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
                {store?.place_name}
              </Typography>
              <Rating
                sx={{
                  position: "relative",
                  bottom: 1,
                  left: 5,
                }}
                value={starred}
                max={1}
                onChange={toggleStarred}
              />
            </div>
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
              {store?.category_name}
            </Typography>
          </Grid>
        </Grid>
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
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              id="transition-modal-title"
              component="h1"
              sx={{
                color: "#333",
                padding: "5px 10px 5px 10px",
                fontFamily: "'Jua', sans-serif",
              }}
            >
              상세정보
            </Typography>
            <Typography
              id="transition-modal-description"
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "0px 10px 0px 10px",
                color: "#555",
              }}
            >
              {store?.address_name && (
                <>
                  <PlaceOutlinedIcon
                    sx={{ fontSize: "1.2rem", marginRight: "5px" }}
                  />
                  {store?.address_name}
                </>
              )}
            </Typography>
            <Typography
              id="transition-modal-description"
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "0px 10px 0px 10px",
                color: "#555",
              }}
            >
              {store?.phone && (
                <>
                  <CallOutlinedIcon
                    sx={{ fontSize: "1.2rem", marginRight: "5px" }}
                  />
                  <a
                    href={`tel:${store?.phone}`}
                    style={{ textDecoration: "none", color: "#4285f4" }}
                  >
                    {store?.phone}
                  </a>
                </>
              )}
            </Typography>
            <Typography
              id="transition-modal-description"
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "0px 10px 10px 10px",
                color: "#555",
              }}
            >
              {store?.place_url && (
                <>
                  <LanguageOutlinedIcon
                    sx={{ fontSize: "1.2rem", marginRight: "5px" }}
                  />
                  <a
                    href={store?.place_url}
                    style={{ textDecoration: "none", color: "#4285f4" }}
                  >
                    {store?.place_url}
                  </a>
                </>
              )}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Page>
  );
};

export default Store;

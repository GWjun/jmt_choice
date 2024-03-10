// Recent.tsx

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

const Recent = () => {
  const { auth } = useAuth();
  const [recent, setRecent] = React.useState<null | Store[]>();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      const { data: recentId, error: recentIdError } = await supabase
        .from("recent")
        .select("recent")
        .eq("email", auth[2]);

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

    fetchData();
  }, []);

  return (
    <Page header={<Title />} footer={<Footer value={0} />}>
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
          {(recent || [])?.length > 0 ? (
            recent?.map((item, _i) => (
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

export default Recent;

import { Card, Typography, Grid, Divider, Button, Box } from "@mui/material";
import Navbar from "../Navbar/navbar";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const CampCard = (props) => {
  const [camp, setCamp] = useState({});
  console.log(props.id);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/findcamp/${props.id}`, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => setCamp(res.data));
  }, []);

  const finishCamp = async () => {
    try {
      const result = await axios
        .get(`${BASE_URL}/finishcamp/${props.id}`, {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) =>console.log(res));

        navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  //   if(camp.amountRaised && camp.amountRequested)  setProgress(Math.trunc(((camp.amountRaised)/(camp.amountRequested))*100));
  const navigate = useNavigate();

  let desc, titl;

  if (camp.description) desc = camp.description.substring(0, 500) + "...";
  if (camp.title)
    titl =
      camp.title.length > 17 ? camp.title.substring(0, 17) + "..." : camp.title;

  const openCamp = (eve) => {
    eve.preventDefault();
    try {
      navigate(`/fundcampaign/${props.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  let progress = 0;
  if (camp.amountRaised && camp.amountRequested)
    progress = Math.trunc((camp.amountRaised / camp.amountRequested) * 100);

  return (
    <>
      <Grid xs={12} sm={4} item>
        <Card
          sx={{
            backgroundColor: "#2a2727",
            padding: "5%",
            minHeight: 380,
            borderRadius: 3,
            boxShadow: "10px 10px #000",
          }}
        >
          <div
            className="titlearea"
            style={{
              display: "flex",
              justifyContent: "space-between",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontWeight: 500, display: "inline", float: "left" }}
              variant="h4"
              color="#fff"
            >
              {titl}
            </Typography>
            {camp.active ? (
              <Typography
                sx={{ fontSize: "15px" }}
                variant="h6"
                color="#0BDA51"
              >
                Active ⦿
              </Typography>
            ) : (
              <Typography
                sx={{ fontSize: "15px" }}
                variant="h6"
                color="#FF3B3B"
              >
                Finished ⦿
              </Typography>
            )}
          </div>
          <Typography sx={{ fontSize: "15px" }} variant="h6" color="#797979">
            {camp.campaignHolder}&nbsp;({camp.age}/{camp.gender})&nbsp;-&nbsp;
            {camp.city},&nbsp;{camp.state}
          </Typography>
          <Divider color="#000" sx={{ margin: "2% 0%" }} />
          <Typography
            color="#dadada"
            sx={{ fontSize: "15px", marginBottom: "4%" }}
            variant="h6"
          >
            {desc}
          </Typography>
          <Typography
            sx={{ fontSize: "15px", display: "inline", float: "left" }}
            variant="h6"
            color="#797979"
          >
            Raised{" "}
            <span style={{ color: "#dadada" }}>
              ₹{camp.amountRaised}/₹{camp.amountRequested}
            </span>
          </Typography>
          <Typography
            sx={{
              fontSize: "15px",
              textAlign: "right",
              display: "inline",
              float: "right",
            }}
            variant="h6"
            color="secondary"
          >
            {progress}%
          </Typography>
          <Box sx={{ width: "100%", display: "inline-block" }}>
            <LinearProgress
              sx={{ borderRadius: 2 }}
              color="secondary"
              variant="determinate"
              value={progress}
            />
          </Box>
          <div style={{ marginTop: "2%" }}>
            {camp.active ? (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {" "}
                <Button
                  sx={{ fontWeight: 600, borderRadius: 2, width: "48%" }}
                  onClick={openCamp}
                  color="secondary"
                  variant="contained"
                >
                  Review➜
                </Button>{" "}
                <Button
                  sx={{
                    fontWeight: 600,
                    borderRadius: 2,
                    width: "48%",
                    background:
                      "linear-gradient(60deg, #FF6666 30%, #FF3B3B 100%, #FF6666 70%)",
                  }}
                  onClick={finishCamp}
                  color="secondary"
                  variant="contained"
                >
                  Finish➜
                </Button>{" "}
              </div>
            ) : (
              <Typography
                sx={{ fontSize: "15px" }}
                variant="h6"
                color="#DAF7A6"
              >
                The collections will be sent to your bank account.
              </Typography>
            )}
          </div>
        </Card>
      </Grid>
    </>
  );
};

export default CampCard;

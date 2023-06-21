import { Button, Typography } from "@mui/material";
import logo from "../../assets/logo.png";
import "./navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useContext } from "react";
import UserContext from "../../context/user/usercontext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Navbar = () => {
  const authUser = useContext(UserContext);
  const navigate = useNavigate();

  const [showNav, setNav] = useState(false);

  const logout = async () => {
    axios
      .get(`${BASE_URL}/logout`, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {console.log(res); navigate(0);})
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "8vh",
          backgroundColor: "#000",
          width: "100%",
          position: "fixed",
          top: 0,
          zIndex: 7,
        }}
      >
        <div style={{ width: "50%", paddingLeft: "2%" }}>
          <a href="/">
            <img
              className="navlogo"
              src={logo}
              alt=""
              style={{ height: "5vh" }}
            ></img>
          </a>
        </div>
        <div
          style={{
            width: "50%",
            paddingRight: "2%",
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          {authUser.state.id ? (
            <Button className="navlinks" onClick={logout} sx={{background:"transparent", boxShadow: "0 0 0 0 #fff"}}>
            <Typography
              className="navlinks"
              style={{
                color: "#fff",
                textAlign: "right",
                // marginRight: "4%",
                fontSize: "2vh",
                letterSpacing: 3,
                fontWeight: 500,
              }}
              variant="h5"
              
            >
              
                LOGOUT
                
             
            </Typography>
            </Button>
          ) : (
            <Button className="navlinks" component={Link} to="/login" sx={{background:"transparent", boxShadow: "0 0 0 0 #fff"}}>
            <Typography
             className="navlinks"
              style={{
                color: "#fff",
                textAlign: "right",
                // marginRight: "4%",
                fontSize: "2vh",
                letterSpacing: 3,
                fontWeight: 500,
              }}
              variant="h5"
            >
              
                LOGIN/REGISTER
              
            </Typography>
            </Button>
          )}
          <Button className="navlinks" component={Link} to="/user/dashboard"  sx={{ marginRight: "2%", background:"transparent", boxShadow: "0 0 0 0 #fff"}}>
          <Typography
            className="navlinks"
            style={{
              color: "#fff",
              textAlign: "right",
            
              fontSize: "2vh",
              letterSpacing: 3,
              fontWeight: 500,
            }}
            variant="h5"
          >
            
              DASHBOARD
            
          </Typography>
          </Button>
          <Button className="navlinks" component={Link} to="/expressions"  sx={{marginRight: "2%", background:"transparent", boxShadow: "0 0 0 0 #fff"}}>
          <Typography
           className="navlinks"
            style={{
              color: "#fff",
              textAlign: "right",
           
              fontSize: "2vh",
              letterSpacing: 3,
              fontWeight: 500,
            }}
            variant="h5"
          >
            
              EXPRESSIONS
            
          </Typography>
          </Button>
          <Button className="navlinks" component={Link} to="/fundcampaigns"  sx={{marginRight: "2%", background:"transparent", boxShadow: "0 0 0 0 #fff"}}>
          <Typography
           className="navlinks"
            style={{
              color: "#fff",
              textAlign: "right",
            
              fontSize: "2vh",
              letterSpacing: 3,
              fontWeight: 500,
            }}
            variant="h5"
          >
            
              DONATE
            
          </Typography>
          </Button>

          {showNav ? (
            <CloseIcon
              onClick={() => {
                setNav(!showNav);
              }}
              className="micon"
              style={{ color: "#fff" }}
            />
          ) : (
            <MenuIcon
              onClick={() => {
                setNav(!showNav);
              }}
              className="micon"
              style={{ color: "#fff" }}
            />
          )}
        </div>
      </div>
      {showNav && (
        <div
          className="micon slide-left"
          style={{
            backgroundColor: "#000",
            zIndex: 7,
            marginTop: "8vh",
            position: "fixed",
            right: 0,
            top: 0,
            width: "30vh",
            height: "92vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            style={{
              color: "#fff",
              textAlign: "right",
              fontSize: "2vh",
              letterSpacing: 3,
              fontWeight: 500,
              margin: "3% auto",
            }}
            variant="h5"
          >
            <a
              href="/user/dashboard"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              DASHBOARD
            </a>
          </Typography>

          <Typography
            style={{
              color: "#fff",
              textAlign: "right",
              fontSize: "2vh",
              letterSpacing: 3,
              fontWeight: 500,
              margin: "3% auto",
            }}
            variant="h5"
          >
            <a
              href="/fundcampaigns"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              DONATE
            </a>
          </Typography>
          <Typography
            style={{
              color: "#fff",
              textAlign: "right",
              fontSize: "2vh",
              letterSpacing: 3,
              fontWeight: 500,
              margin: "3% auto",
            }}
            variant="h5"
          >
            <a
              href="/expressions"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              EXPRESSIONS
            </a>
          </Typography>

          {authUser.state.id ? (
            <Button onClick={logout} sx={{background:"transparent", boxShadow: "0 0 0 0 #fff"}}>
            <Typography
              style={{
                color: "#fff",
                textAlign: "right",
                fontSize: "2vh",
                letterSpacing: 3,
                fontWeight: 500,
                margin: "3% auto",
              }}
              variant="h5"
              
            >
            

                
                LOGOUT
               

                
            </Typography>
            </Button>
          ) : (
            <Typography
              style={{
                color: "#fff",
                textAlign: "right",
                fontSize: "2vh",
                letterSpacing: 3,
                fontWeight: 500,
                margin: "3% auto",
              }}
              variant="h5"
            >
              <a
                href="/login"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                LOGIN/REGISTER
              </a>
            </Typography>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;

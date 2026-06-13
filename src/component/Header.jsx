import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { CgMathPlus } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GrMicrophone } from "react-icons/gr";
import { FaUserAlt } from "react-icons/fa";
import FilterButton from "./FilterButton";
import { Link, useNavigate } from "react-router-dom";

function Header({
  toggleHide,
  search,
  setSearch,
  category,
  setCategory,
}) {
  const username = localStorage.getItem("username");

  const isLoggedIn =
    username &&
    username !== "undefined" &&
    username !== "null";

  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("channelId");
    localStorage.removeItem("channelName");

    navigate("/login");

    window.location.reload();
  };

  const handleCreate = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    const channelId =
      localStorage.getItem("channelId");

    if (!channelId) {
      navigate("/create-channel");
    } else {
      navigate("/upload-video");
    }
  };

  const handleMyChannel = () => {
    const channelId =
      localStorage.getItem("channelId");

    if (!channelId) {
      alert("Please Create Channel First");
      navigate("/create-channel");
      return;
    }

    navigate(`/channel/${channelId}`);
  };

  return (
    <>
      <nav className="nav">
        <div className="logoD">
          <button
            onClick={toggleHide}
            style={{
              border: "none",
              backgroundColor: "white",
              fontSize: "35px",
            }}
          >
            <IoMenu />
          </button>

          <div className="logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1280px-YouTube_Logo_2017.svg.png"
              height="25px"
              width="100px"
              alt="YouTube"
            />
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search"
            className="headInput"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <button id="headBtn">
            <FaSearch />
          </button>

          <button id="microPhone">
            <GrMicrophone />
          </button>
        </div>

        <div id="endBtn">
          {isLoggedIn ? (
            <div
              style={{
                position: "relative",
              }}
            >
              <button
                className="createBtn"
                onClick={() =>
                  setShowMenu(!showMenu)
                }
              >
                {username}
              </button>

              {showMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: "45px",
                    right: "0",
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    minWidth: "150px",
                    zIndex: 1000,
                  }}
                >
                  <button
                    onClick={handleMyChannel}
                  >
                    My Channel
                  </button>

                  <button
                    onClick={() =>
                      navigate("/upload-video")
                    }
                  >
                    Upload Video
                  </button>

                  <button
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="createBtn">
                <FaUserAlt /> Sign In
              </button>
            </Link>
          )}

          <button
            className="createBtn"
            onClick={handleCreate}
          >
            <CgMathPlus /> Create
          </button>

          <button id="notification">
            <IoMdNotificationsOutline />
          </button>
        </div>
      </nav>

      <FilterButton
        category={category}
        setCategory={setCategory}
      />
    </>
  );
}

export default Header;
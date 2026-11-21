
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import { CgMathPlus } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GrMicrophone } from "react-icons/gr";
import FilterButton from "./FilterButton";
import { Link, useNavigate } from "react-router-dom";

function Header({
  toggleHide,
  search,
  setSearch,
  category,
  setCategory,
  showSide,
}) {
  const username = localStorage.getItem("username");

  const isLoggedIn =
    username && username !== "undefined" && username !== "null";

  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("channelId");
    localStorage.removeItem("channelName");

    setShowMenu(false);
    navigate("/login");
  };

  const handleCreate = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const channelId = localStorage.getItem("channelId");

    if (!channelId) {
      navigate("/create-channel");
    } else {
      navigate("/upload-video");
    }
  };

  const handleMyChannel = () => {
    const token = localStorage.getItem("token");
    const channelId = localStorage.getItem("channelId");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (!channelId) {
      alert("Please create your channel first");
      navigate("/create-channel");
      return;
    }

    setShowMenu(false);
    navigate(`/channel/${channelId}`);
  };

  const handleUpload = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    setShowMenu(false);
    navigate("/upload-video");
  };

  return (
    <div className="mobileSearch">
      <nav className="nav">

        {/* Logo and Sidebar */}
        <div className="logoD">
          <button
            type="button"
            onClick={toggleHide}
            aria-label="Toggle sidebar"
            style={{
              border: "none",
              backgroundColor: "white",
              fontSize: "35px",
              cursor: "pointer",
            }}
          >
            <IoMenu />
          </button>

          <div className="logo">
            <Link
              to="/"
              aria-label="VideoHub Home"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <span
                className="brandName"
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#222",
                }}
              >
                VideoHub
              </span>
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="searchContainer">
          <input
            type="text"
            placeholder="Search videos"
            className="headInput"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search videos"
          />

          <button
            type="button"
            id="headBtn"
            aria-label="Search"
          >
            <FaSearch />
          </button>

          <button
            type="button"
            id="microPhone"
            aria-label="Voice search"
          >
            <GrMicrophone />
          </button>
        </div>

        {/* User Actions */}
        <div id="endBtn">

          {isLoggedIn ? (
            <div style={{ position: "relative" }}>

              <button
                type="button"
                className="createBtn"
                onClick={() => setShowMenu(!showMenu)}
                aria-expanded={showMenu}
                aria-haspopup="true"
              >
                {username}
              </button>

              {showMenu && (
                <div
                  role="menu"
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
                    type="button"
                    role="menuitem"
                    onClick={handleMyChannel}
                  >
                    My Channel
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleUpload}
                  >
                    Upload Video
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button
                type="button"
                className="createBtn"
              >
                <FaUserAlt /> Sign In
              </button>
            </Link>
          )}

          <button
            type="button"
            className="createBtn"
            onClick={handleCreate}
          >
            <CgMathPlus /> Create
          </button>

          <button
            type="button"
            id="notification"
            aria-label="Notifications"
          >
            <IoMdNotificationsOutline />
          </button>

        </div>
      </nav>

      {/* Video Categories */}
      <FilterButton
        category={category}
        setCategory={setCategory}
        showSide={showSide}
      />
    </div>
  );
}

export default Header;

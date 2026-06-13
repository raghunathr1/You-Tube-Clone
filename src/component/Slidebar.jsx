import { TiHome } from "react-icons/ti";
import { SiYoutubeshorts } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { BiSolidLike } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { RiVideoFill } from "react-icons/ri";

function Slidebar({ showSide }) {
  return (
    <div
      className={
        showSide
          ? "slidebar"
          : "slidebarCollapsed"
      }
    >
      {/* Always Visible */}
      <div>
        <h3>
          <TiHome />
          {showSide && " Home"}
        </h3>

        <h3>
          <SiYoutubeshorts />
          {showSide && " Shorts"}
        </h3>
      </div>

      {/* Only when Sidebar Open */}
      {showSide && (
        <>
          <hr />

          <div>
            <h2>Subscription</h2>

            <span className="slideItem">
              Raghu Tech
            </span>

            <span className="slideItem">
              Techno Tech
            </span>

            <span className="slideItem">
              Amazon Vlog
            </span>

            <span className="slideItem">
              India News
            </span>

            <span className="slideItem">
              SiyaRam SongsClub
            </span>

            <span className="slideItem">
              Jungle Book
            </span>
          </div>

          <hr />

          <div>
            <h3>You</h3>

            <span className="slideItem">
              <BsYoutube /> Your Channel
            </span>

            <span className="slideItem">
              <BiSolidLike /> Liked Videos
            </span>

            <span className="slideItem">
              <FaHistory /> History
            </span>

            <span className="slideItem">
              <FaDownload /> Download
            </span>

            <span className="slideItem">
              <RiVideoFill /> Your Videos
            </span>
          </div>
        </>
      )}

      {/* Collapsed Mode */}
      {!showSide && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
            marginTop: "25px",
            fontSize: "24px",
            alignItems: "center",
          }}
        >
          <BsYoutube />
          <BiSolidLike />
          <FaHistory />
          <FaDownload />
          <RiVideoFill />
        </div>
      )}
    </div>
  );
}

export default Slidebar;
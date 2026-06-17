import { TiHome } from "react-icons/ti";
import { SiYoutubeshorts } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { BiSolidLike } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { RiVideoFill } from "react-icons/ri";

function Slidebar({ showSide }) {
  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={
          showSide
            ? "slidebar"
            : "slidebarCollapsed"
        }
      >
        {/* Open Sidebar */}
        {showSide ? (
          <>
            <div>
              <h3>
                <TiHome />
                Home
              </h3>

              <h3>
                <SiYoutubeshorts />
                Shorts
              </h3>
            </div>

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
        ) : (
          <>
            <h3>
              <TiHome />
            </h3>

            <h3>
              <SiYoutubeshorts />
            </h3>

            <h3>
              <BsYoutube />
            </h3>

            <h3>
              <BiSolidLike />
            </h3>

            <h3>
              <FaHistory />
            </h3>

            <h3>
              <FaDownload />
            </h3>

            <h3>
              <RiVideoFill />
            </h3>
          </>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="mobileBottomNav">
        <div className="mobileNavItem">
          <TiHome />
          <span>Home</span>
        </div>

        <div className="mobileNavItem">
          <SiYoutubeshorts />
          <span>Shorts</span>
        </div>

        <div className="mobileNavItem">
          <BsYoutube />
          <span>Channel</span>
        </div>

        <div className="mobileNavItem">
          <BiSolidLike />
          <span>Liked</span>
        </div>

        <div className="mobileNavItem">
          <RiVideoFill />
          <span>Videos</span>
        </div>
      </div>
    </>
  );
}

export default Slidebar;
import { IoMenu } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { CgMathPlus } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GrMicrophone } from "react-icons/gr";
import { FaUserAlt } from "react-icons/fa";
import FilterButton from "./FilterButton";
import { Link } from "react-router-dom";
function Header({ toggleHide, search, setSearch, category, setCategory }){
    return(
        <>
        <nav className="nav">
            <div className="logoD">
            <button onClick={toggleHide} style={{border:'none', backgroundColor:'white', fontSize:'35px'}}><IoMenu /></button>
            <div className="logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1280px-YouTube_Logo_2017.svg.png" height='25px' width='100px' alt="Img" />
            </div>
            </div>

            <div>
                <input type="text" placeholder="Search" className="headInput" value={search} onChange={(e)=>setSearch(e.target.value)} />
                <button id="headBtn"><FaSearch /></button>
                <button id="microPhone"><GrMicrophone /></button>                
            </div>
            <div id="endBtn">
                <Link to="/register"><button className="createBtn"><FaUserAlt /> Sign In </button></Link>
                <button className="createBtn"><CgMathPlus />Create</button>
                <button id="notification"><IoMdNotificationsOutline /></button>
                <button>😀</button>
            </div>
        </nav>
        <FilterButton 
        category = {category}
        setCategory = {setCategory}
        />
        </>
    )
}

export default Header;
function FilterButton({category, setCategory}){
    return(
        <div className="filterPage">
        <button className="filtBtn" onClick={()=>setCategory("All")}> All </button>
        <button className="filtBtn" onClick={()=>setCategory("Songs")}>Songs</button>
        <button className="filtBtn" onClick={()=>setCategory("News And Politics")}>News And Politics</button>
        <button className="filtBtn" onClick={()=>setCategory("Cartoon")}>Cartoon</button>
        <button className="filtBtn" onClick={()=>setCategory("Coding Education")}>Coding Education</button>
        <button className="filtBtn" onClick={()=>setCategory("Travel and Vlog")}>Travel and Vlog</button>
        <button className="filtBtn" onClick={()=>setCategory("Food and Cooking")}>Food And Cooking</button>
        <button className="filtBtn" onClick={()=>setCategory("Science and Technology")}>Science and Technology</button>
        <button className="filtBtn" onClick={()=>setCategory("Comedy")}>Comedy</button>
        </div>
    )
}
export default FilterButton;
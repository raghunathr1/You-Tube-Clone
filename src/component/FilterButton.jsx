function FilterButton({ category, setCategory, showSide }) {
  const categories = [
    "All",
    "Songs",
    "News And Politics",
    "Cartoon",
    "Coding Education",
    "Travel and Vlog",
    "Food and Cooking",
    "Comedy",
  ];

  return (
    <div
      className={
        showSide
          ? "filterPage"
          : "filterPageFull"
      }
    >
      {categories.map((item) => (
        <button
          key={item}
          className="filtBtn"
          onClick={() => setCategory(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default FilterButton;
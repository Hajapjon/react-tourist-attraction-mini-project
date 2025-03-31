import { useState, useEffect } from "react";
import axios from "axios";
import TourCard from "./TourCard";
function SearchBar() {
  // -------------------------
  // State: Search Input
  // -------------------------
  const [search, setSearch] = useState("");
  const handleSearch = (event) => {
    setSearch(event.target.value.trimStart());
  };

  // -------------------------
  // State: Search Results
  // -------------------------
  const [tourList, setTourList] = useState([]);

  // -------------------------
  // Fetch Tour List with Debounce
  // -------------------------
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const getTourList = async () => {
        try {
          const result = await axios.get(
            `http://localhost:4001/trips?keywords=${search}`
          );
          setTourList(result.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      getTourList();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  // -------------------------
  // Tag Click
  // -------------------------
  const handleTagClick = (tag) => {
    const words = search.trim().split(" ");
    if (!words.includes(tag)) {
      setSearch((prev) => (prev.trim() === "" ? tag : prev + " " + tag));
    }
  };

  // -------------------------
  // Render
  // -------------------------
  return (
    <div className="flex flex-col justify-center items-center">
      {/* Search Input */}
      <div className="flex flex-col mx-10 px-10 border-b border-gray-300 py-2 w-1/2">
        <p>ค้นหาที่เที่ยว</p>
        <input
          name="search"
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน..."
          value={search}
          onChange={handleSearch}
          className="text-center"
        />
      </div>

      {/* Search Result */}
      <div>
        <ul>
          {tourList.map((list) => {
            return (
              <li key={list.eid}>
                <TourCard
                  title={list.title}
                  url={list.url}
                  description={list.description}
                  photos={list.photos}
                  tags={list.tags}
                  onTagClick={handleTagClick}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SearchBar;

function SearchBar({ city, setCity, handleSearch }) {
  return (
    <section className="search-section">
      <input
        type="text"
        placeholder="Search for a city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />

      <button onClick={handleSearch}>Search</button>
    </section>
  );
}

export default SearchBar;
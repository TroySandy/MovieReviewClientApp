const config = {
  REACT_APP_SERVER_API_URL:
    window.location.hostname === "localhost" || "127.0.0.1"
      ? "localhost:4000"
      : "https://aem-bb-server-herokuapp.com",
  REACT_APP_TMDB_API_URL: "https://api.themoviedb.org/3",
  REACT_APP_TMDB_API_KEY: "302a8b956ef8d08b82b132a5754be253",
};

export default config;

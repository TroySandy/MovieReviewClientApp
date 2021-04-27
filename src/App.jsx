import { Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/home/Home";
import Header from "./components/site/Header";
import Footer from "./components/site/Footer";
import { UserContextProvider } from "./contexts/UserContext";
import "./App.css";
import Movie from "./components/movie/Movie";

function App() {
  return (
    <div className="App" className="grey">
      <UserContextProvider>
        <Header />

        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/movie/:movie_id" component={Movie} />
          <Route path="/" component={Home} />
        </Switch>

        <Footer />
      </UserContextProvider>
    </div>
  );
}

export default App;

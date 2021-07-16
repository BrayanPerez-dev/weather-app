import axios from "axios";

export default axios.create({
  baseURL: "https://cors-anywhere-venky.herokuapp.com/https://www.metaweather.com/api",
});

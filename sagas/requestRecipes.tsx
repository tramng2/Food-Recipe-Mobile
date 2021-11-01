import axios from "axios";

export function requestGetRecipes(input: string) {
  return axios.request({
    method: "get",
    url: `https://forkify-api.herokuapp.com/api/search?q=${input}`,
  });
}

import axios from "axios";

export function requestGetRecipe(recipeId: string) {
  return axios.request({
    method: "get",
    url: `https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`,
  });
}

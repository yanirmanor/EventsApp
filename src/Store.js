import { proxy } from "valtio";

export const favorite = proxy({
  list: [],
  setList: (list) => {
    favorite.list = [...list];
  },
  loadFromStorage: () => {
    const list = localStorage.getItem("myFavorite");
    if (list?.length > 0) {
      favorite.list = [...JSON.parse(list)];
    }
  },
  clearList: () => {
    favorite.list = [];
  },
  addItem: (item) => {
    const isExist = favorite.list.some((fav) => fav.id === item.id);
    if (!isExist) {
      favorite.list.push(item);
      localStorage.setItem("myFavorite", JSON.stringify(favorite.list));
    }
  },
  removeItem: (id) => {
    favorite.list = favorite.list.filter((item) => item.id !== id);
    localStorage.setItem("myFavorite", JSON.stringify(favorite.list));
  },
});

import AssetsState, { assetsModels } from "vStore/assets";
import { proxy, useSnapshot, ref, snapshot, subscribe } from "valtio";
import { subscribeKey } from "valtio/utils";
const state = proxy({
  section: "reports",
  search: "123",
  searchResult: {},
});
let searchTout;
subscribeKey(state, "search", () => {
  state.searchResult[state.section] = [];
  clearTimeout(searchTout);
  searchTout = setTimeout(async () => evalSearch(state.section), 500);
});
subscribeKey(state, "section", () => {
  state.searchResult[state.section] = [];
  initFuse(state.section);
  // searchTout = setTimeout(aync () => evalSearch("reports"), 500);
});
export const setSection = (section) => {
  state.section = section;
};
export const setSearch = (search) => {
  state.search = search;
};
export const clearSearch = (search) => {
  state.search = "";
};
export function initSearchWorker() {
  if (typeof Worker !== "undefined") {
    console.log("initWorker");
    state.searchWorker = ref(new Worker("searchWorker.js"));
    state.searchWorker.onmessage = function (event) {
      console.log("workerMessage", event);
      if (event.data.type == "done") {
        evalSearch(state.section);
      } else if (event.data.type == "result") {
        !state.searchResult && (state.searchResult = {});
        state.searchResult[event.data.section] = event.data.searchResult;
      }
    };
  }
}
export function initFuse(section) {
  if (typeof Worker !== "undefined") {
    // state.searchResult = null;
    const sourceData = snapshot(AssetsState[section]);
    console.log(state.searchWorker);
    if (sourceData?.length) {
      console.log("watching2 worker init");
      state.searchWorker.postMessage({
        type: "INIT",
        data: {
          items: sourceData,
          keys: assetsModels[section].searchKeys,
        },
      });
    }
  }
}
export const evalSearch = async (section) => {
  if (typeof Worker !== "undefined") {
    state.searchResult?.length == 0 && (state.searchResult = null);
    AssetsState[section] &&
      state.searchWorker.postMessage({
        type: "SEARCH",
        data: {
          search: state.search,
          sourceData: snapshot(AssetsState[section]),
          section,
        },
      });
  }
};
export default state;
export const useSearch = () =>
  typeof window !== "undefined" ? useSnapshot(state) : snapshot(state);

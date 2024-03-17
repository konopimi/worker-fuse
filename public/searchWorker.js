importScripts("fuse.min.js");
let fuse;
let initializePromise = null;
let searchPromise = null;
let rejectInit = null;
let rejectSearch = null;
console.log("Worker Test");
const abortProtocol = () => {
  console.log(
    "initializePromise",
    initializePromise,
    "searchPromise",
    searchPromise,
  );
  if (initializePromise !== null) {
    console.log("init cancel");
    rejectInit("Cancelled"); // Cancel the previous initialization
  }
  if (searchPromise !== null) {
    console.log("search cancel");
    rejectSearch("Cancelled"); // Cancel the previous search
  }
};
self.onmessage = async (event) => {
  // console.log(event);
  const { type, data } = event.data;
  abortProtocol();
  if (type === "INIT") {
    const { items, keys } = data;

    console.log("INIT:", keys);
    initializePromise = new Promise((resolve, reject) => {
      rejectInit = reject;
      // const Fuse = require("fuse.js");
      fuse = new Fuse(items, {
        keys,
        includeScore: true,
        shouldSort: true,
      });
      resolve(fuse);
    });
    console.log("INITDONE");
    try {
      await initializePromise;
      initializePromise = null;
      rejectInit = null;
      postMessage({ type: "done" });
    } catch (err) {
      console.log(`Initialization failed: ${err}`);
      initializePromise = null; // Reset the promise even if it fails
      rejectInit = null;
    }
  } else if (type === "SEARCH") {
    const { search, sourceData, section } = data;
    console.log("search", sourceData, search, section);
    searchPromise = new Promise((resolve, reject) => {
      rejectSearch = reject;
      let searchResult;
      if (!fuse || search == "") {
        searchResult = sourceData;
      } else {
        const result = fuse
          .search(search)
          .filter((fuzzResult) => fuzzResult.score <= 0.15);
        searchResult = sourceData.filter((data) =>
          result.some((fuzzResult) => data._id === fuzzResult.item._id),
        );
      }
      resolve(searchResult);
    });
    // console.log("searchPromise", searchPromise);
    try {
      searchResult = await searchPromise;
      searchPromise = null;
      rejectSearch = null;
      postMessage({ type: "result", searchResult, section });
    } catch (err) {
      console.log(`Search failed: ${err}`);
      searchPromise = null; // Reset the promise even if it fails
      rejectSearch = null;
    }
  }
};

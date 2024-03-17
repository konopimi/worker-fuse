import { initSearchWorker, initFuse } from "vStore/search";
import { useEffect, useRef } from "react";
import AssetsState, { assetsModels } from "vStore/assets";
import { useSearch, setSection, setSearch, clearSearch } from "vStore/search";
import { useAssets } from "vStore/assets";
export default function SearchReports() {
  const { search, searchResult, section } = useSearch();
  const assets = useAssets();
  const searchInputRef = useRef(null);
  useEffect(() => {
    initSearchWorker();
    initFuse(section);
  }, []);
  const sectionResult = searchResult[section];
  const foundAssets = assets[section]?.filter((asset) =>
    sectionResult?.some((resultItem) => asset._id === resultItem._id),
  );
  const onSearchInput = (e) => {
    const value = e.target.value;
    setSearch(value);
  };
  return (
    <div style={{ width: "min(1000px,100vw)", margin: "auto" }}>
      <h1>BUSCADOR CON WORKER</h1>
      <div
        style={{
          background: "rgba(200,200,200,0.38)",
          padding: 10,
          borderRadius: 10,
          backdropFilter: "blur(3px)",
          position: "sticky",
          top: 10,
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 5,
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid rgb(120,120,120)",
          filter: "drop-shadow(0px 5px 0.3rem rgba(10,10,10,0.62))",
        }}
      >
        <a target="_blank" href={"https://github.com/konopimi/worker-fuse"}>
          {"https://github.com/konopimi/worker-fuse"}
        </a>
        <div
          style={{
            display: "flex",
            gap: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <select value={section} onChange={(e) => setSection(e.target.value)}>
            {Object.entries(assetsModels).map(([key, value]) => (
              <option key={key} value={key}>
                {value.label}
              </option>
            ))}
          </select>
          <div style={{ marginLeft: "5px" }}>🔎</div>
          <input
            value={search}
            ref={searchInputRef}
            autoComplete="off"
            onInput={onSearchInput}
          />
          <button
            style={{
              fontSize: "120%",
            }}
            disabled={search === ""}
            onClick={clearSearch}
          >
            ⌫
          </button>
        </div>
        {`${foundAssets.length} items encontrados`}
      </div>
      <br />
      {/* <pre>{JSON.stringify(sectionResult, null, 2)}</pre> */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {foundAssets.map((asset) => (
          <div
            key={asset._id}
            style={{
              padding: 5,
              borderRadius: 10,
              background: "silver",
              border: "2px solid rgb(150,150,150)",
              filter: "drop-shadow(0px 5px 0.3rem rgba(10,10,10,0.62))",
            }}
          >
            {assetsModels[section].listUI(asset)}
          </div>
        ))}
      </div>
    </div>
  );
}

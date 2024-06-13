import { configure } from "@zenfs/core";
import fs from "@zenfs/core";

import { Fetch, Overlay } from "@zenfs/core";
import { IndexedDB } from "@zenfs/dom";
import publicFileSystemIndex from "../../index.json";

const useTestFileSystem = () => {
  configure({
    mounts: {
      "/": {
        backend: Overlay,
        readable: {
          backend: Fetch,
          index: publicFileSystemIndex,
        },
        writable: {
          backend: IndexedDB,
          storeName: "fs-cache",
        },
      },
    },
  }).then(() => {
    console.log("Finished configure");
    fs.readFileSync("/desktop/test", (err, res) => {
      console.log("READ");
      console.log("RES: ", err);
      console.log("RES: ", res);
    });
    fs.readFileSync("public/desktop/test", (err, res) => {
      console.log("READ");
      console.log("RES: ", err);
      console.log("RES: ", res);
    });
  });
};

export default useTestFileSystem;

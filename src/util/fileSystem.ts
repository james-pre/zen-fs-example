import { configure } from "@zenfs/core";
import { fs } from "@zenfs/core";

import { Fetch, Overlay } from "@zenfs/core";
import { IndexedDB } from "@zenfs/dom";
import publicFileSystemIndex from "../../index.json";

const useTestFileSystem = () => {
  const config = {
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
  };
  configure(config).then(() => {
    fs.readFile("/desktop/dir/test1", { encoding: "utf-8" }, (err, res) => {
      console.log("READ");
      console.log("ERR: ", err);
      console.log("RES: ", res);
    });
    // fs.readFile("/desktop/dir/test2", { encoding: "utf-8" }, (err, res) => {
    //   console.log("READ");
    //   console.log("ERR1: ", err);
    //   console.log("RES1: ", res);
    // });
    // fs.readdir("/desktop", (_, res) => {
    //   console.log("READDIR", res);
    // });
  });
};

export default useTestFileSystem;

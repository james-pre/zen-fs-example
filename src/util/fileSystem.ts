import { configure } from "@zenfs/core";
import { fs } from "@zenfs/core";

import { Fetch, Overlay } from "@zenfs/core";
import { IndexedDB } from "@zenfs/dom";
import publicFileSystemIndex from "../../public/index.json";
import { useEffect } from "react";

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
  useEffect(() => {
    configure(config).then(() => {
      fs.readFile("/desktop/dir/test2", { encoding: "utf-8" }, (err, res) => {
        console.log("test2: ERR1: ", err);
        console.log("RES1: ", res);
      });

      fs.readdir("/desktop", (_, res) => {
        console.log("READDIR Err: ", _);
        console.log("READDIR", res);
      });
      fs.readFile("/desktop/dir/test", { encoding: "utf-8" }, (err, res) => {
        console.log("ERR: ", err);
        console.log("test: RES: ", res);
      });
    });
  });
};

export default useTestFileSystem;

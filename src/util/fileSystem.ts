import { FileSystem } from "@zenfs/core";
import { configure } from "@zenfs/core";
import fs from "@zenfs/core";
import { useEffect, useState } from "react";

import { Fetch, Overlay } from "@zenfs/core";
import { IndexedDB } from "@zenfs/dom";
import publicFileSystemIndex from "../../index.json";

const useTestFileSystem = () => {
  const [fileSys, setFileSys] = useState<FileSystem | null>(null);
  useEffect(() => {
    if (!fileSys) {
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
      });

      fs.readFile("/desktop/test", (res) => {
        console.log("READ");
        console.log("RES: " + res);
      });
      fs.readFile("public/desktop/test", (res) => {
        console.log("READ");
        console.log("RES: " + res);
      });
    }
  }, [fileSys]);
  return { fileSys };
};

export default useTestFileSystem;

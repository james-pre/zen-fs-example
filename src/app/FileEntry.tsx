"use client";
import useTestFileSystem from "../util/fileSystem";

const FileEntry = () => {
  useTestFileSystem();

  return <div>FileEntry</div>;
};

export default FileEntry;

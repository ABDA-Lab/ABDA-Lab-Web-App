'use client'

import DownloadFileButton from "@/components/DownloadFileButton";
import UploadFileButton from "@/components/UploadFileButton";

export default function Test() {




  return (
    <>
      <h1>Download private</h1>
      <DownloadFileButton filePath={"private/test3.txt"} private={true}></DownloadFileButton>
      <br></br>
      <h1>Download public</h1>
      <DownloadFileButton filePath={"public/test.jpg"} private={false}></DownloadFileButton>

      <br></br>
      <h1>Upload private</h1>
      <UploadFileButton filePath={"private/"}></UploadFileButton>
    </>
  );
}

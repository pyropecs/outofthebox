import React from "react";
import { useState } from "react";
import Compressor from "compressorjs";

const ImageUpload = ({
  SelectedFile,
  setSelectedFile,
  PreviewFile,
  setPreviewFile,
}) => {
  const [FileInputState, setFileInputState] = useState("");

  async function handleFileInput(e) {
    e.preventDefault();
    const file = e.target.files[0];
    new Compressor(file, {
      quality: 0.6,
      maxWidth: 640,
      maxHeight: 640,
      success(compressedImage) {
        previewFileFunc(compressedImage);
        setSelectedFile(compressedImage);
      },
    });
    setFileInputState(e.target.value);
  }

  function previewFileFunc(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewFile(reader.result);
    };
  }
  return (
    <div className="flex w-full justify-between  bg-grey-lighter">
      <div className="text-black flex align-center">
        <label
          className="block text-gray-700  text-sm self-center font-bold mb-2"
          htmlFor="name"
        >
          IMAGE UPLOAD:
        </label>
      </div>

      <label className="w-32 flex flex-col items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer transition duration-300 hover:bg-green-600">
        <svg
          className="w-5 h-5"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span className="mt-2 text-sm leading-normal">Select a file</span>
        <input
          type="file"
          value={FileInputState}
          onChange={handleFileInput}
          className="hidden"
        />
      </label>
      {PreviewFile ? (
        <img
          src={PreviewFile}
          alt="the image that you chosen"
          className="h-64"
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ImageUpload;

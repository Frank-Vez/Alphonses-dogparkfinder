import { useEffect, useRef, useState } from "react";

const UploadWidget = ({ setPictureUrl }) => {
  const [uploaded, setUpdloaded] = useState(false);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "drve0nkv3",
        uploadPreset: "nqqs8cvi",
      },
      function (error, result) {
        if (result.event === "success") {
          setUpdloaded(true);
          setPictureUrl(result.info.url);
        }
      }
    );
  }, []);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        widgetRef.current.open();
      }}
      disabled={uploaded ? true : false}
    >
      {uploaded ? "uploaded!" : "Upload picture"}
    </button>
  );
};

export default UploadWidget;

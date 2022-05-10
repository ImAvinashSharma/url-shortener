import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import loader from "../assets/loader.gif";

function SenderLink() {
  const { code } = useParams();
  const history = useHistory();

  if (code === undefined) {
    history.push("/");
  }

  // States
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function redirect() {
      const response = await fetch(`http://localhost:9000/urlShort/${code}`);
      const data = await response.json();
      console.log(data);
      setUrl(data.url);
      if (response.status !== 200) {
        return history.push("/");
      }
      window.location.replace(data.url);
    }
    redirect();
    return () => {
      setIsLoading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <div className="flex items-center	justify-center h-screen">
      <h1 className="text-center text-4xl">Transferring...</h1>
      <br />
      {url && <a href={url}>Click if link not working</a>}
      <h1 className="text-center text-4xl">{url}</h1>
      {isLoading && <img src={loader} alt="loading..." />}
    </div>
  );
}

export default SenderLink;

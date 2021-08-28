import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { db } from "../firebase";
import loader from "../assets/loader.gif";

function SenderLink() {
  const { code } = useParams();
  const history = useHistory();
  // States
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  document.title = `Redirect to ${localStorage.URL ? localStorage.URL : url}`;

  useEffect(() => {
    async function redirect() {
      const query = await db.collection("urls").where("code", "==", code);
      query.onSnapshot(data => {
        if (data.empty) {
          return history.push("/");
        }
        const finalData = data.docs[0].data();
        setUrl(finalData.url);
        localStorage.URL = url;
        window.location.replace(url);
      });
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
      <h1 className="text-center text-4xl">{url}</h1>
      {isLoading && <img src={loader} alt="loading..." />}
    </div>
  );
}

export default React.memo(SenderLink);

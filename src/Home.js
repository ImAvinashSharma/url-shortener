import React, { useState } from "react";
import shortid from "shortid";
import { db } from "./firebase";
import { IconButton } from "@material-ui/core";
import { Send } from "@material-ui/icons";

export default function Home() {
  const [url, setUrl] = useState("");
  const [isPressent, setIsPressent] = useState(false);
  const code = shortid.generate();

  function validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  const handleFormSubmit = async e => {
    e.preventDefault();
    if (!validURL(url)) {
      return alert("Please enter a valid URL");
    }
    await db.collection("urls").add({
      url: url,
      code: code
    });
    setIsPressent(true);
  };

  return (
    <div className="flex items-center	justify-center h-screen">
      <form onSubmit={handleFormSubmit}>
        <h1 className="text-center text-3xl mb-8">URL Shortener</h1>
        <div className="flex border-2 border-black shadow-xl rounded-full">
          <input className="w-96 border-none ml-6 outline-none text-xl" type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="Enter the URL..." />
          <IconButton type="submit">
            <Send />
          </IconButton>
        </div>
        {isPressent && ShortLink(code)}
      </form>
    </div>
  );
}

function ShortLink(code) {
  const setUrl = `http://localhost:3006/links/${code}`;
  return (
    <pre className="flex bg-black m-4 p-4 pt-5 text-white rounded-xl">
      <code>
        {setUrl}
        {"  "}
      </code>
      <button
        className="inline-block	 items-start	 bg-green-500 rounded-md hover:bg-green-600 text-xs text-center text-white p-1"
        onClick={() => {
          navigator.clipboard.writeText(setUrl);
        }}
      >
        Copy
      </button>
    </pre>
  );
}

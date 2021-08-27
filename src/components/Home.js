import React, { useState } from "react";
import shortid from "shortid";
import { db } from "../firebase";
import IconButton from "@material-ui/core/IconButton";
import Send from "@material-ui/icons/Send";
import loader from "../assets/loader.gif";
import ShortLink from "./ShortLink";

export default function Home() {
  const [url, setUrl] = useState("");
  // eslint-disable-next-line
  const [code, setCode] = useState(shortid.generate());
  const [isPressent, setIsPressent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  shortid.characters("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~@");

  const validURL = str => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!pattern.test(str);
  };
  const handleFormSubmit = async e => {
    e.preventDefault();
    if (!validURL(url)) {
      return alert("Please enter a valid URL");
    }
    setIsLoading(true);
    await db.collection("urls").doc(code).set({
      url: url,
      code: code
    });
    setIsPressent(true);
    setIsLoading(false);
    setUrl("");
  };

  return (
    <>
      <div className="flex h-xl sm:h-sm items-center	justify-center bg-gradient-to-b	 from-gray-800 via-gray-900 to-black">
        <form onSubmit={handleFormSubmit}>
          <h1 className="text-center text-white text-4xl mb-3">URL Shortener</h1>
          <p className="text-center text-white text-lg mb-6">Create short links easy and faster.</p>
          <div className="flex border-2 border-white shadow-xl rounded-full text-white bg-white">
            <input className="text-black md:w-96 border-none ml-6 outline-none text-xl" type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="Enter the URL..." />
            <IconButton type="submit" color="primary">
              <Send />
            </IconButton>
          </div>
          {isLoading && (
            <div className="flex items-center	justify-center pt-4">
              <img src={loader} width="144" height="144" alt="loading..." className="rounded-full" />
            </div>
          )}
          <div>{isPressent && <ShortLink code={code} />}</div>
        </form>
      </div>
      <h1 className="text-white text-center bg-black h-9">
        Made with ❤️ by <a href="https://avinash-sharma.com/">Avinash Sharma</a>
      </h1>
    </>
  );
}

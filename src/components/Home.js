import React, { useReducer, useEffect, useRef } from "react";
import shortid from "shortid";
import { db } from "../firebase";
import { reducer, validURL } from "./reducer";
import loader from "../assets/loader.gif";
import ShortLink from "./ShortLink";

const initialState = {
  url: "",
  code: shortid.generate(),
  isPressent: false,
  isLoading: false
};

function Home() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

  shortid.characters("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~@");

  const handleFormSubmit = async e => {
    e.preventDefault();
    if (!validURL(state.url)) {
      return alert("Please enter a valid URL");
    }
    dispatch({ type: "SET_LOADING" });
    await db.collection("urls").doc(state.code).set({
      url: state.url,
      code: state.code
    });
    dispatch({ type: "TOGGEL" });
  };

  return (
    <>
      <div className="flex h-xl sm:h-sm items-center	justify-center bg-gradient-to-b	 from-gray-800 via-gray-900 to-black">
        <form onSubmit={handleFormSubmit}>
          <h1 className="text-center text-white text-4xl mb-3">URL Shortener</h1>
          <p className="text-center text-white text-lg mb-6">Create short links easy and faster.</p>
          <div className="flex border-2 border-white shadow-xl rounded-full text-white bg-white">
            <input ref={inputRef} className="text-black md:w-96 md:p-2 border-none ml-6 outline-none text-xl" type="text" value={state.url} onChange={e => dispatch({ type: "SET_URL", payload: e.target.value })} placeholder="Enter the URL..." />
            <button className="flex p-3 rounded-full	 hover:bg-yellow-300 text-black" type="submit">
              Shorten URL
            </button>
          </div>
          {state.isLoading && (
            <div className="flex items-center	justify-center pt-4">
              <img src={loader} width="144" height="144" alt="loading..." className="rounded-full" />
            </div>
          )}
          <div>{state.isPressent && <ShortLink code={state.code} />}</div>
        </form>
      </div>
      <h1 className="text-white text-center bg-black h-9">
        Made with ❤️ by <a href="https://avinash-sharma.com/">Avinash Sharma</a>
      </h1>
    </>
  );
}

export default Home;

import React from "react";

export default function ShortLink({ code }) {
  return (
    <pre className="bg-black m-4 p-4 pt-5 text-white rounded-xl">
      <code>
        {`${window.location.href}${code}`}
        {"  "}
      </code>
      <button
        type="button"
        className="inline-block	items-start bg-green-500 rounded-md hover:bg-green-600 text-xs text-center text-white p-1"
        onClick={() => {
          navigator.clipboard.writeText(`${window.location.href}${code}`);
        }}
      >
        Copy
      </button>
    </pre>
  );
}

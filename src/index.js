import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "https://d29307ec989c4be5a3f26ffb0a1a25d3@o975527.ingest.sentry.io/5931624",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0
});

ReactDOM.render(<App />, document.getElementById("root"));

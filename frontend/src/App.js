import { Route, BrowserRouter as Router, Link } from "react-router-dom";

import "./App.css";

import { PlaceOrderPage } from "./components/PlaceOrderPage";
import { ProductsPage } from "./components/ProductsPage";
import { WelcomePage } from "./components/WelcomePage";
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

import { createRoutesFromChildren, matchRoutes, Routes, useLocation, useNavigationType } from "react-router-dom";
import {
  initializeFaro as coreInit,
  getWebInstrumentations,
  ReactIntegration,
  ReactRouterVersion,
  FaroRoutes
} from '@grafana/faro-react';

function App() {
  return (
    <div className="app">
      <Router>
        <div className="list">
          <ul>
            <li>
              <Link to="/">Welcome</Link>
            </li>
            <li>
              <Link to="products">Products</Link>
            </li>
            <li>
              <Link to="order">Place order</Link>
            </li>
          </ul>
        </div>
        <FaroRoutes>
          <Route exact path="/" element={<WelcomePage />} />
          <Route exact path="products" element={<ProductsPage />} />
          <Route exact path="order" element={<PlaceOrderPage />} />
        </FaroRoutes>
      </Router>
    </div>
  );
}

export function initializeFaro() {

  const faro = coreInit({
    // This does some magic that works along with "Frontend" in the Grafana Cloud UI
    // it also avoids CORS issues when running locally
    url: "https://faro-collector-prod-us-central-0.grafana.net/collect/14c8f20a36a0c4f7b267cf568ce88385",

    // This sends to local alloy instance, and will send traces and logs to the
    // Grafana Cloud, but they won't show up in the "Frontend" UI, but will be
    // available in the traces and logs sources.
    // url: `http://localhost:12347/collect`,
    apiKey: "api_key",
    trackWebVitalsAttribution: true,
    instrumentations: [
      ...getWebInstrumentations({
        captureConsole: true,
      }),
      new TracingInstrumentation(),
      new ReactIntegration({
        router: {
          version: ReactRouterVersion.V6,
          dependencies: {
            createRoutesFromChildren,
            matchRoutes,
            Routes,
            useLocation,
            useNavigationType,
          },
        },
      }),
    ],
    app: {
      name: "frontend",
      version: '1.0.0',
      environment: 'production'
    }
  });

  faro.api.pushLog(['Faro was initialized']);

  return faro;
}

export default App;

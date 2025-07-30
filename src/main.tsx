import { createRoot } from "react-dom/client";
import "antd/dist/antd.min.css";
import zh_CN from "antd/es/locale/zh_CN";
import { ConfigProvider } from "antd";
import App from "./pages";

createRoot(document.getElementById("root")!).render(
  <ConfigProvider locale={zh_CN}>
    <App />
  </ConfigProvider>,
);

import { RouterProvider } from "react-router-dom";
import ToastWrapper from "./routes/ToastWrapper";
import { router } from "./routes";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastWrapper />
    </>
  );
}

export default App;

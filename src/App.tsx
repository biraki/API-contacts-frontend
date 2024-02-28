import GlobalStyle from "./styles/globalStyles";
import { RoutesMain } from "./routes";
import { AuthProvider } from "./providers/AuthProvider";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
          <RoutesMain />
      </AuthProvider>
      <ToastContainer autoClose={2000} />
    </>
  );
}
export default App;

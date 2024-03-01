import GlobalStyle from "./styles/globalStyles";
import { RoutesMain } from "./routes";
import { AuthProvider } from "./providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./providers/UserProvider";

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
      <UserProvider>
          <RoutesMain />
      </UserProvider>
      </AuthProvider>
      <ToastContainer autoClose={2000} />
    </>
  );
}
export default App;

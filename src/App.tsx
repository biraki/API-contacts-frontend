import GlobalStyle from "./styles/globalStyles";
import { RoutesMain } from "./routes";
import { AuthProvider } from "./providers/AuthProvider";
import { AddContactModalProvider } from "./providers/AddContactModalProvider";
import { InfoContactModalProvider } from "./providers/InfoContactModalProvider";
import { UpdateContactModalProvider } from "./providers/UpdateContactModalProvider";

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
          <UpdateContactModalProvider>
            <InfoContactModalProvider>
              <AddContactModalProvider>
                <RoutesMain />
              </AddContactModalProvider>
            </InfoContactModalProvider>
          </UpdateContactModalProvider>
      </AuthProvider>
    </>
  );
}

export default App;

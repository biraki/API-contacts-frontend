import GlobalStyle from './styles/globalStyles'
import { RoutesMain } from './routes'
import { AuthProvider } from './providers/AuthProvider'
import { ModalProvider } from './providers/ModalProvider'

function App() {
  

  return (
    <>
    <GlobalStyle/>
      <ModalProvider>
      <AuthProvider>
        <RoutesMain/>
      </AuthProvider>
      </ModalProvider>
    </>

  )
}

export default App

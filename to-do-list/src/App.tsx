import { Header } from "./components/Header"
import { Main } from "./components/Main"
import "./global.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer toastStyle={{ backgroundColor: "var(--gray-400)", color: "var(--gray-100)" }} />
      <Header />
      <Main />
    </>
  )
}

export default App

import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/index";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}  // Toast baru akan muncul di atas toast sebelumnya
        closeOnClick        // Toast bisa ditutup dengan klik
        pauseOnHover        // Pause waktu tutup ketika di-hover
        draggable           // Toast bisa digeser
        pauseOnFocusLoss
      />  
    </BrowserRouter>
  );
}

export default App;

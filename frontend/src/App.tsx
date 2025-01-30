import Routes from "./components/routes";
import AuthProvider from "./components/auth-provider";


function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;

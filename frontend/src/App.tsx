import AuthProvider from "./components/auth-provider.tsx";
import Routes from "./components/routes.tsx";


function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
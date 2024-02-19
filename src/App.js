import AppRoutes from "./routes";

import { AuthProvider } from "./contexts/authContext";

const App = () => {
  return (
    <>
      <div>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </div>
    </>
  );
};

export default App;

import LoginScreen from '../../src/screens/LoginScreen';
import { AuthProvider } from '../../src/services/auth';

export default function Login() {
  return (
    <AuthProvider>
      <LoginScreen />
    </AuthProvider>
  );
}
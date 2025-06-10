import ScanScreen from '../src/screens/ScanScreen';
import { AuthProvider } from '../src/services/auth';

export default function Scan() {
  return (
    <AuthProvider>
      <ScanScreen />
    </AuthProvider>
  );
}
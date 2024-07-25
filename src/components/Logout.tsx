import { useAuth } from '@services/hooks/auth';
import { Button } from './ui/button';

export function Logout() {
  const auth = useAuth();
  return auth.isAuthenticated ? <Button onClick={() => auth.logout()}>Deslogar</Button> : null;
}

import { auth } from './firebase';

export default async function setTokenOnServer() {
  if (!auth.currentUser) return;

  const token = await auth.currentUser.getIdToken(true);

  await fetch('/api/set-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });
}

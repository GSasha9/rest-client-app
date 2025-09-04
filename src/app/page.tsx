import HomePage from '@/pageComponents/home-page/home-page';
import { CssBaseline } from '@mui/material';

export default function Home() {
  return (
    <>
      <CssBaseline />
      <div>
        <header>
          <span>Header</span>
        </header>
        <main>
          <HomePage />
        </main>
        <footer>Footer</footer>
      </div>
    </>
  );
}

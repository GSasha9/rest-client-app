import Image from 'next/image';
import Page from '../pageComponents/page';
import logo from '../assets/icon.svg';

export default function Home() {
  return (
    <div>
      <header>
        <Image src={logo} alt={'icon'} width={70} height={70}></Image>
      </header>
      <main>
        <Page />
      </main>
    </div>
  );
}

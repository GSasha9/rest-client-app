import { ReactNode } from 'react';
import '../styles/globals.scss';
import '../styles/normalize.css';

interface IProps {
  children: ReactNode;
}
export default function RootLayout({ children }: IProps) {
  return children;
}

import type { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header />

      <Container as="main" className="flex-grow-1 py-5">
        {children}
      </Container>

      <Footer />
    </div>
  );
}

export default Layout;
import Link from 'next/link';
import Image from 'next/image';
import {
  Header,
  DevelopedBy,
  IncubatedBy,
} from '@code4ro/taskforce-fe-components';
import FooterWrapper from './footer/footer';

const Logo = () => (
  <Link href="/">
    <Image
      src="/images/logo-coviz.svg"
      width="110"
      height="30"
      alt="Covid-19. Ce trebuie să fac?"
      priority={true}
    />
  </Link>
);

const MenuItems = [
  <Link href="/about" key="des">
    <a>Despre proiect</a>
  </Link>,
];

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header Logo={Logo()} MenuItems={MenuItems} />
      <DevelopedBy />
      <main>{children}</main>
      <IncubatedBy />
      <FooterWrapper />
    </>
  );
};

export default DefaultLayout;

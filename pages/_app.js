import { registerMap } from "echarts";
import Link from "next/link";
import Image from "next/image";
import "@code4ro/taskforce-fe-components/dist/index.css";
import {
  Header,
  DevelopedBy,
  IncubatedBy,
} from "@code4ro/taskforce-fe-components";
import FooterWrapper from "../components/layout/footer/footer";

import "./../styles/index.scss";
import roGeoJson from "./../config/roGeo.json";

registerMap("RO", roGeoJson);

const Logo = () => (
  <Link href="/">
    <Image
      src="/images/logo-coviz.svg"
      width="110"
      height="30"
      alt="Covid-19. Ce trebuie să fac?"
    />
  </Link>
);

const MenuItems = [
  <Link href="/about" key="des">
    Despre proiect
  </Link>,
];

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header Logo={Logo()} MenuItems={MenuItems} />
      <DevelopedBy />
      <main>
        <Component {...pageProps} />
      </main>
      <IncubatedBy />
      <FooterWrapper />
    </>
  );
}

export default MyApp;

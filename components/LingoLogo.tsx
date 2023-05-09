// MyLogo.tsx
import { Image } from '@nextui-org/react';
import Link from 'next/link';

const LingoLogo: React.FC = () => {
  return (
    <Link href={'/'}>
        <Image
        width={256/2}
        height={78/2}  
        src="/NavbarBrandLingoV.png"
        alt="Default Image"
        objectFit="cover"
        />

    </Link>
  )
};

export default LingoLogo;

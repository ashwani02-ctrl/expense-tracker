import Link from "next/link";
import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

function Header({ buttonText = "Get Started", buttonLink = "/login" }){
    return (
        <div className="p-5 flex justify-between items-center border shadow-sm">
      <Image src={'./logo.svg'}
      alt='logo'
      width={50}
      height={50}></Image>
      <Button><Link href={buttonLink}>{buttonText}</Link></Button>
      </div>
    )
}

export default Header
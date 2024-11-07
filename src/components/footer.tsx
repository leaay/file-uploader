import { Github, Linkedin, Twitch, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
        <div className="w-full bg-slate-900 py-12 px-8 flex items-center">
              <div className="w-full flex justify-between items-center gap-2 ">

                <h1 className="text-[1rem] text-white text-xl tracking-wide">Uploaderv1 @</h1>

                <div className="flex gap-4 text-white pl-4 border-l">
                <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin />
                </Link>
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github />
                </Link>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter />
                </Link>
                <Link href="https://twitch.tv" target="_blank" rel="noopener noreferrer">
                  <Twitch />
                </Link>
                </div>

              </div>
      </div>
  );
};

export default Footer;
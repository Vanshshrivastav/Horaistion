import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center py-4 ">
      <div className="text-sm">
        <p className="mb-4">Horaistion</p>
        <div className="mb-4">
          <Link to="/about" className="hover:text-[#E3B505] mr-4">About</Link>
          <Link to="/contact" className="hover:text-[#E3B505]">Contact</Link>
        </div>
        <p>
          Copyright © 2025 LOGO All Rights Reserved
        </p>
        <p className="text-xs">
          Disclaimer: This site Horaistion does not store any files on its server.
          All contents are provided by non-affiliated third parties.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

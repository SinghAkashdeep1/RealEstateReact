import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Routing from "../../routes/Routing";
const Layouts = ({ children }) => {
  return (
    <>
      <div className="d-flex flex-column h-100">
        <Header/>
        <div className="flex-grow-1">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layouts;

import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a
          href="https://www.essendonquarries.com.au/"
          target="_blank"
          rel="noopener noreferrer"
          // style={{ color: "white" }}
        >
          Essendon Portal
        </a>
        <span className="ml-1">&copy; 2022 </span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a
          href="http://nexgeninnovations.com.au/"
          target="_blank"
          rel="noopener noreferrer"
          // style={{ color: "white" }}
        >
          Nexgen Innovations
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);

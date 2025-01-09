import React from "react";
import { useSelector } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

// sidebar nav config
import navigation from "./_nav";

const TheSidebar = () => {
  const show = useSelector((state) => state.sidebarShow);



  return (
    <CSidebar
      show={show}
      // onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
        
      <CSidebarBrand className="d-md-down-none" to="/">
     
        <CIcon />
        <CIcon />
        {/* <CSidebarMinimizer className="c-d-md-down-none ml-80 bg-transparent " /> */}
      </CSidebarBrand>
      
      <CSidebarNav
      //</CSidebar>onClick={toggleSidebar}
      >
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
          //  onClick={toggleSidebar}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);

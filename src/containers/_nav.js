const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "",
    isToggleable: false,
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Central Control",
    route: "/centralcontrol",
    icon: "cil-settings", // Changed icon
    isToggleable: false,
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Check List Enquiry",
        to: "/centralcontrol/CheckList",
        isToggleable: true,
      },
      {
        _tag: "CSidebarNavItem",
        name: "Timesheet Enquiry",
        to: "/centralcontrol/TimesheetEnq",
        isToggleable: true,
      },
      {
        _tag: "CSidebarNavItem",
        name: "Job Truck Enquiry",
        to: "/centralcontrol/JobTruckEnq",
        isToggleable: true,
      },
      {
        _tag: "CSidebarNavItem",
        name: "Route Truck Enquiry",
        to: "/centralcontrol/TruckRouteHistory",
        isToggleable: true,
      },
      {
        _tag: "CSidebarNavItem",
        name: "ESQ Live Map",
        to: "/centralcontrol/LiveMap",
        isToggleable: true,
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Master ",
    route: "/centralcontrol",
    icon: "cil-list", // Changed icon
    isToggleable: false,
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Customer ",
        to: "/Master/QuotationCust",
        isToggleable: true,
      },
      {
        _tag: "CSidebarNavItem",
        name: "Supplier",
        to: "/Master/QuotationSuplier",
        isToggleable: true,
      },
      {
        _tag: "CSidebarNavItem",
        name: "Product",
        to: "/Master/ProductMaster",
        isToggleable: true,
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Quotation",
    to: "/Quotation/QuotationScreen",
    icon: "cil-file", // Changed icon
    isToggleable: true,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Job Order",
    to: "/JobOrder/JobOrderScreen",
    icon: "cil-task", // Changed icon
    isToggleable: false,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Job Planing",
    to: "/JobPlaning/JobPlaningMainScreen",
    icon: "cil-calendar", // Changed icon
    isToggleable: true,
  },
];

export default _nav;

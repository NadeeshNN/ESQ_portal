import React from "react";
import './tailwind.css';

const Toaster = React.lazy(() =>
  import("./views/notifications/toaster/Toaster")
);
const Breadcrumbs = React.lazy(() =>
  import("./views/base/breadcrumbs/Breadcrumbs")
);
const Cards = React.lazy(() => import("./views/base/cards/Cards"));
const Navbars = React.lazy(() => import("./views/base/navbars/Navbars"));
const Navs = React.lazy(() => import("./views/base/navs/Navs"));
const Popovers = React.lazy(() => import("./views/base/popovers/Popovers"));
const ProgressBar = React.lazy(() =>
  import("./views/base/progress-bar/ProgressBar")
);
const Switches = React.lazy(() => import("./views/base/switches/Switches"));
const Tabs = React.lazy(() => import("./views/base/tabs/Tabs"));
const Tooltips = React.lazy(() => import("./views/base/tooltips/Tooltips"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const CoreUIIcons = React.lazy(() =>
  import("./views/icons/coreui-icons/CoreUIIcons")
);
const Flags = React.lazy(() => import("./views/icons/flags/Flags"));
const Brands = React.lazy(() => import("./views/icons/brands/Brands"));
const Alerts = React.lazy(() => import("./views/notifications/alerts/Alerts"));
const Badges = React.lazy(() => import("./views/notifications/badges/Badges"));
const Modals = React.lazy(() => import("./views/notifications/modals/Modals"));
const Colors = React.lazy(() => import("./views/theme/colors/Colors"));
const Typography = React.lazy(() =>
  import("./views/theme/typography/Typography")
);
const Widgets = React.lazy(() => import("./views/widgets/Widgets"));
const Users = React.lazy(() => import("./views/users/Users"));
const User = React.lazy(() => import("./views/users/User"));

const CheckList = React.lazy(() =>
  import("./components/centralcontrol/CheckList")
);
const JobTruckEnq = React.lazy(() =>
  import("./components/centralcontrol/JobTruckEnq")
);
const TimesheetEnq = React.lazy(() =>
  import("./components/centralcontrol/TimesheetEnq")
);
const Login = React.lazy(() => import("./views/pages/login/Login"));
const LiveMap = React.lazy(() => import("./components/centralcontrol/LiveMap"));
const RouteHistory = React.lazy(() =>
  import("./components/centralcontrol/TruckRouteHistory")
);
const QuotationScreen = React.lazy(() =>
  import("./components/Quotation/QuotationScreen")
);
const JobOrderScreen = React.lazy(() =>
  import("./components/JobOrder/JobOrderScreen")
);
const CustomerMaster = React.lazy(() =>
  import("./components/Master/QuotationCust")
);
const SupplierMaster = React.lazy(() =>
  import("./components/Master/QuotationSuplier")
);
const ProductMaster = React.lazy(() =>
  import("./components/Master/ProductMaster")
);
const JobPlaning = React.lazy(() =>
  import("./components/JobPlaning/JobPlaningMainScreen")
);

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/login", name: "Login", component: Login },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/theme", name: "Theme", component: Colors, exact: true },
  { path: "/theme/colors", name: "Colors", component: Colors },
  { path: "/theme/typography", name: "Typography", component: Typography },
  { path: "/base", name: "Base", component: Cards, exact: true },
  { path: "/base/breadcrumbs", name: "Breadcrumbs", component: Breadcrumbs },
  { path: "/base/cards", name: "Cards", component: Cards },
  { path: "/base/navbars", name: "Navbars", component: Navbars },
  { path: "/base/navs", name: "Navs", component: Navs },
  { path: "/base/popovers", name: "Popovers", component: Popovers },
  { path: "/base/progress-bar", name: "Progress Bar", component: ProgressBar },
  { path: "/base/switches", name: "Switches", component: Switches },
  { path: "/base/tabs", name: "Tabs", component: Tabs },
  { path: "/base/tooltips", name: "Tooltips", component: Tooltips },
  { path: "/icons", exact: true, name: "Icons", component: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", component: CoreUIIcons },
  { path: "/icons/flags", name: "Flags", component: Flags },
  { path: "/icons/brands", name: "Brands", component: Brands },
  {
    path: "/notifications",
    name: "Notifications",
    component: Alerts,
    exact: true,
  },
  { path: "/notifications/alerts", name: "Alerts", component: Alerts },
  { path: "/notifications/badges", name: "Badges", component: Badges },
  { path: "/notifications/modals", name: "Modals", component: Modals },
  { path: "/notifications/toaster", name: "Toaster", component: Toaster },
  { path: "/widgets", name: "Widgets", component: Widgets },
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },
  {
    path: "/centralcontrol/CheckList",
    name: "CheckList",
    component: CheckList,
  },
  {
    path: "/centralcontrol/JobTruckEnq",
    name: "JobTruckEnq",
    component: JobTruckEnq,
  },
  {
    path: "/centralcontrol/TimesheetEnq",
    name: "TimesheetEnq",
    component: TimesheetEnq,
  },
  {
    path: "/centralcontrol/LiveMap",
    name: "LiveMap",
    component: LiveMap,
  },
  {
    path: "/centralcontrol/TruckRouteHistory",
    name: "RouteHistory",
    component: RouteHistory,
  },
  {
    path: "/Quotation/QuotationScreen",
    name: "QuotationScreen",
    component: QuotationScreen,
  },
  {
    path: "/JobOrder/JobOrderScreen",
    name: "JobOrderScreen",
    component: JobOrderScreen,
  },
  {
    path: "/Master/QuotationCust",
    name: "CustomerMaster",
    component: CustomerMaster,
  },
  {
    path: "/Master/QuotationSuplier",
    name: "SupplierMaster",
    component: SupplierMaster,
  },
  {
    path: "/Master/ProductMaster",
    name: "ProductMaster",
    component: ProductMaster,
  },
  {
    path: "/JobPlaning/JobPlaningMainScreen",
    name: "JobPlaning",
    component: JobPlaning,
  },
];

export default routes;

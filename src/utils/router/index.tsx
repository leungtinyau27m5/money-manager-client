import { RouteObject } from "react-router-dom";
import loadable from "@loadable/component";
import PageLoader from "src/components/loader/PageLoader";

const HomePage = loadable(() => import("src/pages/HomePage"), {
  fallback: <PageLoader />,
});
// const LoginPage = loadable(() => import("src/pages/LoginPage"), {
//   fallback: <PageLoader />,
// });
// const RegisterPage = loadable(() => import("src/pages/RegisterPage"), {
//   fallback: <PageLoader />,
// });
const ProtectedPage = loadable(() => import("src/pages/ProtectedPage"), {
  fallback: <PageLoader />,
});
// const CategoriesPage = loadable(
//   () => import("src/pages/protected/CategoriesPage"),
//   {
//     fallback: <PageLoader />,
//   }
// );
const DashboardPage = loadable(
  () => import("src/pages/protected/DashboardPage"),
  {
    fallback: <PageLoader />,
  }
);
const ChartPage = loadable(() => import("src/pages/protected/ChartPage"), {
  fallback: <PageLoader />,
});
// const SettingPage = loadable(() => import("src/pages/protected/SettingPage"), {
//   fallback: <PageLoader />,
// });

const myRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "chart",
        element: <ChartPage />,
      },
    ],
  },
];

// const myRoutes: RouteObject[] = [
//   {
//     path: "/",
//     element: <HomePage />,
//     children: [
//       {
//         path: "/login",
//         element: <LoginPage />,
//       },
//       {
//         path: "/register",
//         element: <RegisterPage />,
//       },
//       {
//         path: "/dashboard",
//         element: <ProtectedPage />,
//         children: [
//           {
//             index: true,
//             element: <DashboardPage />,
//           },
//           // {
//           //   path: "category",
//           //   element: <CategoriesPage />,
//           // },
//           {
//             path: "chart",
//             element: <ChartPage />,
//           },
//           // {
//           //   path: "setting",
//           //   element: <SettingPage />,
//           // },
//         ],
//       },
//     ],
//   },
// ];

export default myRoutes;

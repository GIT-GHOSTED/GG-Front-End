// Layout component: provides a protected, fixed sidebar UI using Ant Design.
// - Shows a centered, fixed logo inside the sidebar area.
// - Renders a Menu of links beneath the logo.
// - Locks page body scrolling and lets main content scroll internally.
// - Redirects to /login if no auth token is provided.
// This file includes comments aimed at a junior bootcamp developer explaining each part.

import { useState, useEffect } from "react";
import {
  Navigate,
  Outlet,
  useLocation,
  Link,
  useNavigate,
} from "react-router-dom";
import { Layout as AntLayout, Menu, theme as antdTheme } from "antd";
// Ant Design icon imports. You can swap icons for others from @ant-design/icons
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  FileTextOutlined,
  LinkedinOutlined,
  GlobalOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
// Import your logo image. Adjust the path if your file lives somewhere else.
import gitGhost from "../../img/Dark-Ghost.png";
// Ant styles (quick start). In production you may import theme CSS differently.
import "antd/dist/antd.css";

/* =============
   Constants
   =============
   These values control visual layout. Tweak them for spacing/size.
*/
const { Sider, Content } = AntLayout;
const LOGO_TOP = 12; // distance from top of viewport to top of logo (px)
const LOGO_SIZE = 85; // fixed height of logo (px)
const SIDER_WIDTH = 260; // width of expanded sidebar (px)
const SIDER_COLLAPSED_WIDTH = 80; // width when sidebar is collapsed (px)

/* Layout component
   - token: the current authentication token (string or null)
   - setToken: function to update token (used for logout)
   - themeMode: current theme ('dark' or 'light') passed from App for sidebar styling
*/
export default function Layout({ token, setToken, themeMode }) {
  // useLocation gives us the current URL path so we can mark the active menu item.
  const location = useLocation();
  // useNavigate lets us programmatically navigate (used after logout).
  const navigate = useNavigate();
  const { token: antdToken } = antdTheme.useToken();

  /* Prevent page-level scrolling while this layout is mounted.
     We set document.body.style.overflow = "hidden" on mount
     and restore the previous value on unmount.
  */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  /* -----------------------
     Authentication guard
     -----------------------
     If the caller didn't pass a token, we immediately redirect to /login.
     Navigate from react-router returns a React element that performs the redirect.
  */
  if (!token) return <Navigate to="/login" replace />;

  /* If current path is exactly the home page ("/"), we return <Outlet />
     so nested routes (children) render without the sidebar. This keeps
     the home page public / separate from protected pages.
  */
  if (location.pathname === "/") return <Outlet />;

  // State to track whether the sider is collapsed (narrow) or expanded (wide).
  const [collapsed, setCollapsed] = useState(false);

  // Determine which menu item should be highlighted based on the current path.
  // We take the first segment after "/" (e.g., "/dashboard/..." -> "dashboard").
  const selectedKey = location.pathname.split("/")[1] || "dashboard";

  // Logout behavior: clear token state, remove persisted token, and navigate to login.
  const handleLogout = () => {
    setToken?.(null); // clear app state token (if setToken provided)
    localStorage.removeItem("token"); // remove persisted token
    navigate("/login", { replace: true }); // redirect to login and replace history
  };

  /* -----------------------
     Menu/link definitions
     -----------------------
     Each entry describes one menu item: key, path, label, icon, and whether it's external.
     - external: true means open with <a href> in a new tab instead of react-router Link.
  */
  const links = [
    {
      key: "dashboard",
      path: "/dashboard",
      label: "Dashboard",
      icon: <UserOutlined />,
    },
    {
      key: "applications",
      path: "/applications",
      label: "Applications",
      icon: <FileTextOutlined />,
    },
    {
      key: "linkedin",
      path: "https://www.linkedin.com/feed/",
      label: "LinkedIn",
      icon: <LinkedinOutlined />,
      external: true,
    },
    {
      key: "ziprecruiter",
      path: "https://www.ziprecruiter.com/",
      label: "ZipRecruiter",
      icon: <GlobalOutlined />,
      external: true,
    },
    {
      key: "indeed",
      path: "https://www.indeed.com/",
      label: "Indeed",
      icon: <GlobalOutlined />,
      external: true,
    },
  ];

  /* menuPaddingTop ensures the Menu items start below the centered logo.
     We use LOGO_TOP + LOGO_SIZE + extra spacing (12px) so there is breathing room.
  */
  const menuPaddingTop = LOGO_TOP + LOGO_SIZE + 12;

  /* AntD v5 prefers a data-driven `items` prop rather than JSX children for Menu.
     We build menuItems from the links array, and append a Logout item at the end.
  */
  const menuItems = [
    ...links.map((l) => ({
      key: l.key,
      icon: l.icon || null, // Ant icon component or null
      label: l.external ? (
        // external link: uses an <a> tag that opens in a new tab safely
        <a href={l.path} target="_blank" rel="noopener noreferrer">
          {l.label}
        </a>
      ) : (
        // internal link: use react-router Link for client-side navigation
        <Link to={l.path}>{l.label}</Link>
      ),
    })),
    {
      key: "logout",
      icon: <LogoutOutlined />,
      // The label can be any React node; here it's a span that calls handleLogout when clicked.
      label: (
        <span onClick={handleLogout} style={{ cursor: "pointer" }}>
          Logout
        </span>
      ),
    },
  ];

  const isDarkMode = themeMode === "dark";

  /* ====================
     JSX returned by component
     ====================
     - AntLayout is the root layout container
     - Sider is fixed to the left
     - Content is shifted right by sider width so it doesn't sit underneath the Sider
  */
  return (
    <AntLayout style={{ height: "100vh", overflow: "hidden" }}>
      {/* -----------------
          Centered logo
          -----------------
          We position the logo using:
            left: calc(SIDER_WIDTH / 2) or calc(SIDER_COLLAPSED_WIDTH / 2)
            transform: translateX(-50%) to truly center it horizontally.
          The logo container uses zIndex so it sits above the sider visually.
          The logo has a fixed size so it does not change when the sider collapses.
      */}
      <div
        style={{
          position: "fixed",
          top: LOGO_TOP,
          left: `calc(${collapsed ? SIDER_COLLAPSED_WIDTH : SIDER_WIDTH}px / 2)`,
          transform: "translateX(-50%)",
          zIndex: 1200,
          pointerEvents: "auto",
          width: LOGO_SIZE,
          height: LOGO_SIZE,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* clicking the logo navigates home */}
        <Link to="/" style={{ display: "block" }}>
          <img
            src={gitGhost}
            alt="logo"
            style={{
              height: LOGO_SIZE, // fixed height so it doesn't scale with collapse
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </Link>
      </div>

      {/* -----------------
          Sidebar (Sider)
          -----------------
          Fixed position on the left of the viewport.
          top: 0 so the sidebar covers the full height; the logo overlays it using z-index.
      */}
      <Sider
        collapsible
        collapsed={collapsed} // controlled collapsed state
        onCollapse={(val) => setCollapsed(val)} // toggle handler when user clicks collapse icon
        width={SIDER_WIDTH}
        collapsedWidth={SIDER_COLLAPSED_WIDTH}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          overflow: "hidden", // prevent sider itself from scrolling
        }}
      >
        {/* Ant Menu rendered with items prop to avoid deprecation warning.
            We supply selectedKeys so the current page is highlighted.
            paddingTop pushes menu items below the logo.
        */}
        <Menu
          theme={isDarkMode ? "dark" : "light"}
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          style={{ borderRight: 0, height: "100%", paddingTop: menuPaddingTop }}
        />

        {/* Collapse/expand control (manual because we used a fixed sider).
            Positioned in the bottom-right of the sider. */}
        <div style={{ position: "absolute", right: 12, bottom: 12 }}>
          {collapsed ? (
            <MenuUnfoldOutlined
              onClick={() => setCollapsed(false)}
              style={{ fontSize: 18, cursor: "pointer", color: "#fff" }}
            />
          ) : (
            <MenuFoldOutlined
              onClick={() => setCollapsed(true)}
              style={{ fontSize: 18, cursor: "pointer", color: "#fff" }}
            />
          )}
        </div>
      </Sider>

      {/* -----------------
          Main content area
          -----------------
          marginLeft makes room for the sidebar so the content is not underneath it.
          marginTop is a small offset so content doesn't butt up directly at the top.
          Content area uses overflow: auto so inner content scrolls if it's taller than the area.
      */}
      <AntLayout
        style={{
          marginLeft: collapsed ? SIDER_COLLAPSED_WIDTH : SIDER_WIDTH,
          marginTop: 8,
          height: "100vh",
          overflow: "hidden",
          transition: "margin-left .2s",
        }}
      >
        <Content
          style={{
            margin: 16,
            padding: 24,
            background: antdToken.colorBgContainer,
            color: antdToken.colorText,
            height: "100%",
            overflow: "auto",
          }}
        >
          {/* Outlet is where nested routes render their components (react-router). */}
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
}

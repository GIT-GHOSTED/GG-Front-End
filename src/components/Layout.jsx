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
import gitGhost from "../../img/Light-Ghost.png";
// Ant styles (quick start). In production you may import theme CSS differently.
import "antd/dist/antd.css";

const { Sider, Content } = AntLayout;

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

  // Disable body scrolling while this layout is mounted.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // If not authenticated, go to login.
  if (!token) return <Navigate to="/login" replace />;

  // If we're on the public home page, render children without sidebar.
  if (location.pathname === "/") return <Outlet />;

  const [collapsed, setCollapsed] = useState(false); // sidebar collapsed state
  const selectedKey = location.pathname.split("/")[1] || "dashboard"; // active menu key

  const handleLogout = () => {
    // clear token and go to login
    setToken?.(null);
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  // Menu links (internal use Link, external use anchor)
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

  // Compute how far down the menu should start so it doesn't overlap the logo.
  // We reduced the extra spacing so menu items are closer to the top.
  const menuPaddingTop = LOGO_TOP + LOGO_SIZE + 6;

  // Build Menu items for AntD (v5 uses items prop).
  const menuItems = [
    ...links.map((l) => ({
      key: l.key,
      icon: l.icon || null,
      label: l.external ? (
        <a href={l.path} target="_blank" rel="noopener noreferrer">
          {l.label}
        </a>
      ) : (
        <Link to={l.path}>{l.label}</Link>
      ),
    })),
    {
      key: "logout",
      icon: <LogoutOutlined />,
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
    // Root layout fills the viewport.
    <AntLayout style={{ height: "100vh", overflow: "hidden" }}>
      {/* Centered logo that sits above the sidebar. left uses calc to stay centered when collapsed or expanded. */}
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
        <Link to="/" style={{ display: "block" }}>
          <img
            src={gitGhost}
            alt="logo"
            style={{
              height: LOGO_SIZE,
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </Link>
      </div>

      {/* Sidebar (fixed on the left) */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(val) => setCollapsed(val)}
        width={SIDER_WIDTH}
        collapsedWidth={SIDER_COLLAPSED_WIDTH}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          overflow: "hidden",
        }}
      >
        {/* Menu starts just below the logo with reduced padding */}
        <Menu
          theme={isDarkMode ? "dark" : "light"}
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          style={{ borderRight: 0, height: "100%", paddingTop: menuPaddingTop }}
        />

        {/* Collapse toggle at the bottom-right of the sider */}
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

      {/* Main area shifted right so it doesn't sit under the sider.
          We removed top margins and reduced padding so content is closer to the top. */}
      <AntLayout
        style={{
          marginLeft: collapsed ? SIDER_COLLAPSED_WIDTH : SIDER_WIDTH,
          marginTop: 0,
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
            display: "flex",
            flexDirection: "column",
            overflow: "hidden", // prevent scrollbars here
          }}
        >
          <Outlet /> {/* nested route content appears here */}
        </Content>
      </AntLayout>
    </AntLayout>
  );
}

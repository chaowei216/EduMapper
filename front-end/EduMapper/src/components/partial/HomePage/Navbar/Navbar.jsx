import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import logoEdu from "/img/logoEdu.png";
import {
  Flex,
  Icon,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
const pages = [
  "Trang chủ",
  "Trung tâm tiếng anh",
  "Thi thử",
  "Liên hệ",
  "Cộng đồng",
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
import NotifyBell from "../Notification/Notification";
import useAuth from "../../../../hooks/useAuth";
import styles from "./Navbar.module.css";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const { isOpen, onToggle } = useDisclosure();
  const handleClick = () => {
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      style={{
        background: "#40C993",
        borderRadius: "0px 0px 18px 18px",
        marginBottom: "20px",
        zIndex: "1"
      }}
    >
      <Container maxWidth="xl" id="Trang chủ">
        <Toolbar disableGutters style={{ height: "95px" }}>
          <Image
            boxSize="100px"
            width={145}
            objectFit="cover"
            src={logoEdu}
            alt="Dan Abramov"
          />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Flex
              style={{
                my: 2,
                display: "block",
                zIndex: "1",
                fontSize: "22px",
                fontWeight: "700",
                textTransform: "none",
                fontFamily: "Inter",
                margin: "10px 8px 0px 8px",
              }}
              display={{ base: "none", md: "flex" }}
              ml={10}
            >
              <DesktopNav />
            </Flex>
          </Box>
          {!isAuthenticated && (
            <Box sx={{ flexGrow: 0 }}>
              <Stack
                flex={{ base: 1, md: 0 }}
                justify={"flex-end"}
                direction={"row"}
                spacing={6}
                sx={{ margin: "8px 8px 0px 8px" }}
              >
                <Button
                  onClick={handleClick}
                  variant="contained"
                  sx={{
                    borderRadius: "20px",
                    background: "#1EA26E",
                    fontSize: "17px",
                  }}
                >
                  Đăng nhập
                </Button>
              </Stack>
            </Box>
          )}
          {user && isAuthenticated && (
            <Box sx={{ flexGrow: 0 }}>
              <div className={styles.nav_info}>
                <Stack sx={{ marginRight: "20px" }} spacing={2} direction="row">
                  <NotifyBell />
                </Stack>
                <ProfileMenu />
              </div>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
const NAV_ITEMS = [
  {
    label: "Trang chủ",
    href: "/",
  },
  {
    label: "Trung tâm tiếng anh",
    children: [
      {
        label: "Các Trung Tâm Tiếng Anh",
        subLabel: "Giới thiệu trung tâm",
        href: "/english-center",
      },
      {
        label: "Các khóa học",
        subLabel: "Đăng ký khóa học",
        href: "/course",
      },
    ],
  },
  {
    label: "Thi thử",
    children: [
      {
        label: "Thi thử miễn phí",
        subLabel: "Listening và Reading",
        href: "/take-test",
      },
      {
        label: "Thi thử premium",
        subLabel: "Mua gói để làm được full tính năng",
        href: "/package",
      },
    ],
  },
  {
    label: "Liên hệ",
    href: "/contact",
  },
  {
    label: "Cộng đồng",
    href: "/chat",
  },
];
const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4} zIndex={1}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
            color={"gray.800"}
          >
            {label}
          </Text>
          <Text fontSize={"sm"} color={"gray.600"}>
            {subLabel}
          </Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ArrowRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

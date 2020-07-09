import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { NavLink } from "react-router-dom";

import {
  DashboardIcon,
  FinanceIcon,
  UsersIcon,
  FilesIcon,
  HomescreenIcon,
  OurMissionIcon,
  HowItWorksIcon,
  PortfolioIcon,
  CareerTeamIcon,
  DefimaTokenIcon,
  AboutUsIcon,
  JoinDefimaIcon,
  FAQIcon,
  TermsIcon,
  NewsIcon,
} from "./svg";

function NavTab(props) {
  const { Svg, text, path } = props;

  const CustomLink = (props) => <NavLink to={path} {...props} />;
  return (
    <ListItem button component={CustomLink}>
      <ListItemIcon>
        <Svg />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}

export default function Sidebar({
  openStatus,
  drawerClass,
  drawerPaperClass,
  drawerHeaderClass,
  handleDrawerClose,
  theme,
}) {
  return (
    <Drawer
      className={drawerClass}
      variant="persistent"
      anchor="left"
      open={openStatus}
      classes={{
        paper: drawerPaperClass,
      }}
    >
      <div className={drawerHeaderClass}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {[
          {
            text: "Dashboard",
            Svg: DashboardIcon,
            path: "/pages/account/dashboard",
          },
        ].map((tab, index) => (
          <NavTab {...tab} key={index} />
        ))}
      </List>

      <Divider />
      <List>
        {[
          {
            text: "Finance",
            Svg: FinanceIcon,
            path: "/pages/finance",
          },
          {
            text: "Users",
            Svg: UsersIcon,
            path: "/pages/account/users",
          },
          {
            text: "Files",
            Svg: FilesIcon,
            path: "/pages/account/files",
          },
        ].map((tab, index) => (
          <NavTab {...tab} key={index} />
        ))}
      </List>

      <Divider />
      <List>
        {[
          {
            text: "Homescreen",
            Svg: HomescreenIcon,
            path: "/pages/account/homescreen",
          },
          {
            text: "Our Mission",
            Svg: OurMissionIcon,
            path: "/pages/account/our_mission",
          },
          {
            text: "How it works",
            Svg: HowItWorksIcon,
            path: "/pages/account/how_it_works",
          },
          {
            text: "Portfolio",
            Svg: PortfolioIcon,
            path: "/pages/account/portfolio",
          },
          {
            text: "Career Team",
            Svg: CareerTeamIcon,
            path: "/pages/account/career_team",
          },
          {
            text: "Defima Token",
            Svg: DefimaTokenIcon,
            path: "/pages/account/defima_token",
          },
          {
            text: "About Us",
            Svg: AboutUsIcon,
            path: "/pages/account/about_us",
          },
          {
            text: "Join Defima",
            Svg: JoinDefimaIcon,
            path: "/pages/account/join_us",
          },
          {
            text: "FAQ",
            Svg: FAQIcon,
            path: "/pages/account/faq",
          },
          {
            text: "Terms",
            Svg: TermsIcon,
            path: "/pages/account/terms",
          },
          {
            text: "Privacy",
            Svg: TermsIcon,
            path: "/pages/account/privacy",
          },
        ].map((tab, index) => (
          <NavTab {...tab} key={index} />
        ))}
      </List>
      <Divider />
      <Divider />
      <List>
        {[
          {
            text: "News",
            Svg: NewsIcon,
            path: "/pages/account/news",
          },
        ].map((tab, index) => (
          <NavTab {...tab} key={index} />
        ))}
      </List>
    </Drawer>
  );
}

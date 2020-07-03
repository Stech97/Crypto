import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

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
} from './svg';

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
          {theme.direction === 'ltr' ? (
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
            text: 'Dashboard',
            Svg: DashboardIcon,
          },
        ].map((tab, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              <tab.Svg />
            </ListItemIcon>
            <ListItemText primary={tab.text} />
          </ListItem>
        ))}
      </List>

      <Divider />
      <List>
        {[
          {
            text: 'Finance',
            Svg: FinanceIcon,
          },
          {
            text: 'Users',
            Svg: UsersIcon,
          },
          {
            text: 'Files',
            Svg: FilesIcon,
          },
        ].map((tab, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              <tab.Svg />
            </ListItemIcon>
            <ListItemText primary={tab.text} />
          </ListItem>
        ))}
      </List>

      <Divider />
      <List>
        {[
          {
            text: 'Homescreen',
            Svg: HomescreenIcon,
          },
          {
            text: 'Our Mission',
            Svg: OurMissionIcon,
          },
          {
            text: 'How it works',
            Svg: HowItWorksIcon,
          },
          {
            text: 'Portfolio',
            Svg: PortfolioIcon,
          },
          {
            text: 'Career Team',
            Svg: CareerTeamIcon,
          },
          {
            text: 'Defima Token',
            Svg: DefimaTokenIcon,
          },
          {
            text: 'About Us',
            Svg: AboutUsIcon,
          },
          {
            text: 'Join Defima',
            Svg: JoinDefimaIcon,
          },
          {
            text: 'FAQ',
            Svg: FAQIcon,
          },
          {
            text: 'Terms',
            Svg: TermsIcon,
          },
          {
            text: 'Privacy',
            Svg: TermsIcon,
          },
        ].map((tab, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              <tab.Svg />
            </ListItemIcon>
            <ListItemText primary={tab.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Divider />
      <List>
        {[
          {
            text: 'News',
            Svg: NewsIcon,
          },
        ].map((tab, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              <tab.Svg />
            </ListItemIcon>
            <ListItemText primary={tab.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

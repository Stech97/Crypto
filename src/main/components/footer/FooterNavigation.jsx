import React, { Component } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

class RenderLink extends Component {
  render() {
    const { text, path, type } = this.props;

    switch (type) {
      case "link":
        return (
          <Link to={path}>
            <p>{text}</p>
          </Link>
        );
      case "hashlink":
        return (
          <HashLink to={path}>
            <p>{text}</p>
          </HashLink>
        );
      case "file":
        return (
          <a href={path} download>
            <p>{text}</p>
          </a>
        ); //TODO file download
      case "outsource":
        return (
          <a href={path}>
            <p>{text}</p>
          </a>
        );
      case "popup":
        return (
          <a href={path}>
            <p>{text}</p>
          </a>
        ); // TODO popup link
      default:
        return (
          <Link to={path}>
            <p>{text}</p>
          </Link>
        );
    }
  }
}

class FooterNavColumn extends Component {
  render() {
    const { header, tabs, className } = this.props;

    return (
      <div className={"footer-nav-" + className}>
        <h3>{header}</h3>
        {tabs.map((tab) => {
          return (
            <RenderLink
              key={tab.id}
              text={tab.text}
              path={tab.path}
              type={tab.type}
            />
          );
        })}
      </div>
    );
  }
}

class FooterNav extends Component {
  footerNavigation = {
    columns: [
      {
        id: 1,
        header: "Company",
        className: "company",
        tabs: [
          {
            id: 1,
            text: "Get started",
            path: "/signup",
            type: "link",
          },
          {
            id: 2,
            text: "Our mission",
            path: "/main#OurMission",
            type: "hashlink",
          },
          {
            id: 3,
            text: "Team",
            path: "/main#Team",
            type: "hashlink",
          },
          {
            id: 4,
            text: "Terms of Service",
            path: "/main",
            type: "file",
          },
          {
            id: 5,
            text: "Privacy Policy",
            path: "",
            type: "file",
          },
        ],
      },
      {
        id: 2,
        header: "News",
        className: "news",
        tabs: [
          {
            id: 1,
            text: "Blog",
            path: "https://medium.com/",
            type: "outsource",
          },
          {
            id: 2,
            text: "News Channel",
            path: "https://telegram.org/",
            type: "outsource",
          },
        ],
      },
      {
        id: 3,
        header: "Help & Support",
        className: "help",
        tabs: [
          {
            id: 1,
            text: "E-Mail",
            path: "mailto:support@defima.io",
            type: "outsource",
          },
          {
            id: 2,
            text: "Telegram",
            path: "https://telegram.org/",
            type: "outsource",
          },
          {
            id: 3,
            text: "Presentation",
            path: "/files/Business_presentation.pptx",
            type: "file",
          },
        ],
      },
    ],
  };

  render() {
    return (
      <div className="footer-nav">
        {this.footerNavigation.columns.map((column) => (
          <FooterNavColumn
            key={column.id}
            header={column.header}
            className={column.className}
            tabs={column.tabs}
          />
        ))}
      </div>
    );
  }
}

export default FooterNav;

import React from "react";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { FaUser, FaUserTie, FaRegCircle } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import adminLTELogo from "../../assets/images/admin/logo.png";
import styles from "./Admin.module.css";
import './Admin.css';
import { MdOutlineTypeSpecimen } from "react-icons/md";
import { TbHomeFilled } from "react-icons/tb";

const AdminSidebar = () => {
  const tiles = [
    {
      eventKey: 0,
      name: "User Management",
      icon: <FaUser className="bg-transparent" />,
      children: [
        { name: "User List", link: "/admin/user/list" },
        { name: "Add User", link: "/admin/user/add" }
      ]
    },
    {
      eventKey: 1,
      name: "Type Management",
      icon: <MdOutlineTypeSpecimen className="bg-transparent" />,
      children: [
        { name: "Listing Types", link: "/admin/property/listing-types" },
        { name: "Property Types", link: "/admin/property/property-types" },
        { name: "Property Sub Types", link: "/admin/property/property-sub-types" }
      ]
    },
    {
      eventKey: 2,
      name: "Property Management",
      icon: <TbHomeFilled className="bg-transparent" />,
      children: [
        { name: "Property List", link: "/admin/property/list" },
        { name: "Add Property", link: "/admin/property/add" },

      ]
    }
  ];

  return (
    <div
      className={`${styles.sidebarSide} sidebar-side h-100 p-1 justify-content-center align-items-center`}
    >
      <div className="border-bottom bg-black border-secondary py-2">
        <Link
          to="/admin/dashboard"
          className="text-white text-decoration-none"
        >
          <span className="logo brand-text font-weight-heavy fs-5 mt-3 text-light bg-black">
            <img
              src={adminLTELogo}
              className="bg-black"
              width="60"
              height="50"
              alt="admin-logo"
            />
            <b className="bg-black text-white">Realestate.</b>
            <small className="bg-black text-white">Dashboard</small>
          </span>
        </Link>
      </div>

      <div className="border-bottom border-secondary p-3 px-4 py-3 bg-black">
        <Link
          to="/admin/profile"
          className="text-white bg-black text-decoration-none"
        >
          <FaUserTie size={25} className="me-3 bg-black" />
          <span className="logo brand-text texy-grey font-weight-heavy bg-black">
            <b className="bg-black">Welcome, Admin</b>
          </span>
        </Link>
      </div>

      <Accordion className="p-2 bg-black">
        {tiles.map(tile => (
          <Accordion.Item
            key={tile.eventKey}
            eventKey={tile.eventKey}
            className="accordion-item mb-1 border-0 border-black"
          >
            <Accordion.Header className="accordion-header rounded-3 mb-1">
              <div className={`${styles.accordianLogo} me-1`}>{tile.icon}</div>
              {tile.name}
            </Accordion.Header>
            <Accordion.Body className="bg-black text-white">
              <ul className="list-unstyled bg-black">
                {tile.children.map((child, index) => (
                  <li key={index} className="mb-3 bg-black">
                    <Link
                      to={child.link}
                      className="text-white bg-black text-decoration-none"
                    >
                      <FaRegCircle className="ms-2 me-2 bg-black" /> {child.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default AdminSidebar;

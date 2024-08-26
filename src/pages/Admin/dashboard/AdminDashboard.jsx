import React, { useState, useEffect } from "react";
import { FaUserPlus, FaArrowCircleRight } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { GrProductHunt } from "react-icons/gr";
import { GiJerusalemCross } from "react-icons/gi";
import { MdCalendarMonth } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminDashboardData } from "../../../adminStore/dashboardApi/dashboardSlices";
import { Button, Container, Row, Col, Table } from "react-bootstrap";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dataAdminDash, loading, error } = useSelector(
    (state) => state.adminDashboard
  );
  const [page, setPage] = useState(1);
  const perPage = 5;

  console.log(dataAdminDash?.recent_properties);
  useEffect(() => {
    dispatch(adminDashboardData({ page, perPage }));
  }, [dispatch, page]);

  const dashboardTiles = [
    {
      name: "Users",
      value: dataAdminDash.Users,
      icon: <FaUserPlus size={60} className=" bg-transparent" />,
      link: "/admin/user/list",
      color: "#490F0F",
      bgcolor: "#FB8B24",
      tilebgcolor: "#CE7018",
    },
    {
      name: "Properties",
      value: dataAdminDash.properties,
      icon: <GrProductHunt size={60} className=" bg-transparent" />,
      link: "/admin/property/list",
      color: "white",
      bgcolor: "#D90368",
      tilebgcolor: "#C1045C",
    },
    {
      name: "Listing Type",
      value: dataAdminDash.listingType,
      icon: <BiSolidCategoryAlt size={60} className=" bg-transparent" />,
      link: "/admin/property/listing-types",
      color: "white",
      bgcolor: "#04A777",
      tilebgcolor: "#039569",
    },
    {
      name: "Prop Types",
      value: dataAdminDash.propertyType,
      icon: <GiJerusalemCross size={60} className=" bg-transparent" />,
      link: "/admin/property/property-types",
      color: "black",
      bgcolor: "#FFC6D9",
      tilebgcolor: "#FF9FBF",
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  return (
    <>
      <Container fluid className="d-flex flex-column">
        <Row>
          <Col>
            <h1 className="p-2">Dashboard</h1>
            <h6 className="p-1 mb-2 text-end">Home</h6>
          </Col>
        </Row>
        <Row>
          {dashboardTiles.map((dashboardTile, index) => (
            <Col key={index} xs lg="3">
              <div className="d-flex flex-column border-0 custom-container rounded">
                <div
                  className="dashboardTileRow d-flex flex-row border-0 justify-content-between rounded-top p-2"
                  style={{
                    backgroundColor: dashboardTile.bgcolor,
                    color: dashboardTile.color,
                  }}
                >
                  <div className="d-flex flex-column border-0 custom-sub-container rounded p-2 bg-transparent">
                    <div className="bg-transparent h3">
                      {dashboardTile.value}
                    </div>
                    <div className="bg-transparent h5">
                      {dashboardTile.name}
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center text-end p-2  bg-transparent">
                    {dashboardTile.icon}
                  </div>
                </div>
                <div
                  className="text-center p-2"
                  style={{
                    backgroundColor: dashboardTile.tilebgcolor,
                    color: dashboardTile.color,
                  }}
                >
                  <Link
                    to={dashboardTile.link}
                    className="bg-transparent text-decoration-none"
                    style={{ color: dashboardTile.color }}
                  >
                    More info <FaArrowCircleRight className="bg-transparent" />
                  </Link>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <Row>
          <Col>
            <h2 className="px-2 py-3 mt-3">Users </h2>
            <h6 className="px-2 py-1">
              <MdCalendarMonth />
              current month
            </h6>

            <Table striped bordered rounded hover className="px-2 py-1 mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>E-mail</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {(dataAdminDash?.Recent_users?.data || []).length > 0 ? (
                  dataAdminDash.Recent_users.data.map((user, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "even-row" : "odd-row"
                      } bg-transparent`}
                    >
                      <td className="bg-transparent">
                        {" "}
                        {(dataAdminDash?.Recent_users?.current_page - 1) *
                          perPage +
                          index +
                          1}
                      </td>
                      <td className="bg-transparent">{user.username}</td>
                      <td className="bg-transparent">{user.email}</td>
                      <td className="bg-transparent">
                        {user.createdAt ? user.createdAt : "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No users available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            <div className="d-flex justify-content-between">
              <Button
                onClick={() => setPage(page - 1)}
                disabled={dataAdminDash.current_page <= 1}
              >
                Previous
              </Button>
              <Button
                onClick={() => setPage(page + 1)}
                disabled={dataAdminDash.current_page >= dataAdminDash.last_page}
              >
                Next
              </Button>
            </div>
          </Col>
          <Col>
            <h2 className="px-2 py-3 mt-3">Properties </h2>
            <h6 className="px-2 py-1">
              <MdCalendarMonth />
              latest
            </h6>

            <Table striped bordered rounded hover className="px-2 py-1 mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>id</th>
                  <th>Price</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {(dataAdminDash?.recent_properties || []).length > 0 ? (
                  dataAdminDash?.recent_properties?.map((prop, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "even-row" : "odd-row"
                      } bg-transparent`}
                    >
                      <td className="bg-transparent">
                        {" "}
                        {index +1}
                      </td>
                      <td className="bg-transparent">{prop.id}</td>
                      <td className="bg-transparent">{prop.price}</td>
                      <td className="bg-transparent">
                        {prop.createdAt ? prop.createdAt : "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No users available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

           
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;

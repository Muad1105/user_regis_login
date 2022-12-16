import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../_actions";
import axios from "axios";
import { Button, Card, Col, Row } from "antd";
import { Space, Table, Tag } from "antd";

const url = "https://restcountries.com/v2/all?fields=name,region,flag";

function HomePage() {
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    dispatch(userActions.getAll());
    axios
      .get(url, {
        params: {
          ID: 12345,
        },
      })
      .then(function (response) {
        console.log(response.data);
        setCountryData(response.data);
      });
  }, []);

  function handleDeleteUser(id) {
    dispatch(userActions.delete(id));
  }

  const columns = [
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Flag",
      dataIndex: "flag",
      key: "flag",
    },
    {
      title: "Continent",
      dataIndex: "continent",
      key: "continent",
    },
  ];
  const data = countryData.map((e, i) => {
    return {
      key: "1",
      country: e.name,
      flag: <img style={{ width: "50px" }} src={e.flag} alt={e.name} />,
      continent: e.region,
    };
  });

  return (
    <div className="col-lg-8 offset-lg-2">
      <Table columns={columns} dataSource={data} />
      <p>
        <Button style={{ width: "100%", background: "#007BFF" }}>
          <Link to="/login" style={{ color: "#fff" }}>
            Logout
          </Link>
        </Button>
      </p>
    </div>
  );
}

export { HomePage };

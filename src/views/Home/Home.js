import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import queryString from "query-string";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { Layout, Input, Pagination, Spin } from "antd";

import { Story } from "./components";
import * as api from "../../apis/search";
import "./home.less";

const { Header, Footer, Content } = Layout;
const loadingIcon = <LoadingOutlined style={{ fontSize: 80 }} spin />;

const Home = (props) => {
  const history = useHistory();

  const [query, setQuery] = useState({
    page: parseInt(queryString.parse(props.location.search).page) || 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const getStory = async (query) => {
      try {
        const res = await api.getHints(query);
        setData(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getStory(query);
  }, [query]);

  return (
    <Layout className="layout">
      <Header>
        <div className="header">
          <Link to="/">
            <img className="logo" src={require("./images/h-logo.svg")} alt="" />
          </Link>
          <div style={{ width: 500 }}>
            <Input
              size="large"
              placeholder="Search stories by title, url or author"
              prefix={<SearchOutlined className="search-icon" />}
            />
          </div>
          <div style={{ minWidth: 172 }}>
            <span style={{ fontWeight: "bold" }}>by </span>
            <img
              className="logo-algolia"
              src={require("./images/logo-algolia.png")}
              alt=""
            />

            <img
              className="setting-icon"
              src={require("./images/h-setting.svg")}
              alt=""
            />
          </div>
        </div>
      </Header>
      <Content style={{ padding: "0 100px" }}>
        {isLoading ? (
          <div style={{ textAlign: "center", margin: "50px 0" }}>
            <Spin indicator={loadingIcon} />
          </div>
        ) : (
          <>
            {data.hits.map((story, index) => (
              <Story story={story} key={index} />
            ))}
            <div style={{ textAlign: "center" }}>
              <Pagination
                current={query.page}
                onChange={(nPage) => {
                  window.scrollTo(0, 0);
                  history.push(`?page=${nPage}`);
                  setIsLoading(true);
                  setQuery({ page: nPage });
                }}
                total={data.nbPages * 10}
                showSizeChanger={false}
              />
            </div>
          </>
        )}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <ul className="Footer_list">
          <li>
            <a
              href="https://halocom.vn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Halocom
            </a>
          </li>
          <li>•</li>
          <li>
            <a
              href="https://hn.algolia.com/api"
              target="_blank"
              rel="noopener noreferrer"
            >
              API Documentation
            </a>
          </li>
        </ul>
      </Footer>
    </Layout>
  );
};

export default Home;

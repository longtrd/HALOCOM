import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import queryString from "query-string";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { Layout, Input, Pagination, Spin, Cascader } from "antd";

import { Story } from "./components";
import { Footer } from "../../components";
import * as api from "../../apis/search";
import "./home.less";

const { Header, Content } = Layout;
const loadingIcon = <LoadingOutlined style={{ fontSize: 80 }} spin />;
const optionsSearch = [
  { value: 0, label: "All" },
  { value: 1, label: "Stories" },
  { value: 2, label: "Comment" },
];
const optionsSearchBy = [
  { value: 0, label: "Popularity" },
  { value: 1, label: "Date" },
];
const optionsSearchTime = [
  { value: 0, label: "All time" },
  { value: 1, label: "Last 24h" },
  { value: 3, label: "Past Week" },
  { value: 4, label: "Past Month" },
  { value: 5, label: "Past Year" },
  { value: 6, label: "Custom range" },
];

const Home = (props) => {
  const history = useHistory();
  const qs = queryString.parse(props.location.search);
  const [query, setQuery] = useState({
    page: parseInt(qs.page) || 1,
    sortedBy: qs.sort === "byDate" ? 1 : 0,
    q: qs.q || "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({ hits: [], nbPages: 0 });

  useEffect(() => {
    const getStory = async (query) => {
      try {
        let res;
        if (query.sortedBy) {
          res = await api.getHintsByDate(query);
        } else {
          res = await api.getHintsByPoint(query);
        }
        setData(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    getStory(query);
  }, [query]);

  console.log(query);

  return (
    <Layout className="layout">
      <Header>
        <div className="header">
          <Link to="/">
            <img className="logo" src={require("./images/h-logo.svg")} alt="" />
          </Link>
          <div style={{ flex: 1 }}>
            <Input
              size="large"
              placeholder="Search stories by title, url or author"
              prefix={<SearchOutlined className="search-icon" />}
              defaultValue={query.q}
              onChange={(e) => {
                window.scrollTo(0, 0);
                history.push(
                  `?${queryString.stringify({
                    page: query.page,
                    sort: query.sortedBy ? "byDate" : "byPopularity",
                    q: e.target.value,
                  })}`
                );
                setIsLoading(true);
                setQuery({ ...query, q: e.target.value });
              }}
            />
          </div>
          <div style={{ minWidth: "fit-content" }}>
            <span style={{ fontWeight: "bold", marginLeft: 24 }}>by </span>
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
      <Content className="h-content">
        {isLoading ? (
          <div style={{ textAlign: "center", margin: "50px 0" }}>
            <Spin indicator={loadingIcon} />
          </div>
        ) : (
          <div style={{ margin: "auto", maxWidth: 1800 }}>
            <div className="search-container">
              <div className="search-tool">
                <span className="hidden-text">Search</span>
                <Cascader
                  options={optionsSearch}
                  changeOnSelect
                  defaultValue={["Stories"]}
                  allowClear={false}
                />
                <span className="hidden-text">By</span>

                <Cascader
                  options={optionsSearchBy}
                  changeOnSelect
                  defaultValue={[query.sortedBy ? "Date" : "Popularity"]}
                  onChange={(sort) => {
                    window.scrollTo(0, 0);
                    history.push(
                      `?${queryString.stringify({
                        page: query.page,
                        sort: sort[0] ? "byDate" : "byPopularity",
                        q: query.q,
                      })}`
                    );
                    setQuery({ ...query, sortedBy: sort[0] });
                    setIsLoading(true);
                  }}
                  allowClear={false}
                />
                <span className="hidden-text">For</span>

                <Cascader
                  options={optionsSearchTime}
                  changeOnSelect
                  defaultValue={["All time"]}
                  allowClear={false}
                />
              </div>
              <div className="search-meta hidden-text">
                {`${data.nbHits.toLocaleString()} results (${
                  data.processingTimeMS / 1000
                } seconds)`}
              </div>
            </div>
            {data.hits.length === 0 ? (
              <div style={{ textAlign: "center"}}>We found no stories matching {query.q}
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
                      history.push(
                        `?${queryString.stringify({
                          page: nPage,
                          sort: query.sortedBy ? "byDate" : "byPopularity",
                          q: query.q,
                        })}`
                      );
                      setIsLoading(true);
                      setQuery({ ...query, page: nPage });
                    }}
                    total={data.nbPages * 10}
                    showSizeChanger={false}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </Content>
      <Footer />
    </Layout>
  );
};

export default Home;

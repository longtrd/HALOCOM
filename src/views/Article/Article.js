import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { Footer, Header } from "../../components";
import { CommentContainer } from "./components";
import * as api from "../../apis/article";

const loadingIcon = <LoadingOutlined style={{ fontSize: 80 }} spin />;
const { Content } = Layout;

const Article = () => {
  let { item_id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({ children: [] });

  useEffect(() => {
    const getArticle = async (id) => {
      document.title = "Loading...";
      try {
        const res = await api.getArticle(id);
        setData(res.data);
        document.title = res.data.title;
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    getArticle(item_id);
  }, [item_id]);


  return (
    <Layout>
      <Header />
      <Content className="h-content">
        {isLoading ? (
          <div style={{ textAlign: "center", margin: "50px 0" }}>
            <Spin indicator={loadingIcon} />
          </div>
        ) : (
          <div style={{ margin: "auto", maxWidth: 1800, padding: "10px 10px" }}>
            <div>
              <div className="title">
                <a href={data.url}>
                  {data.title} {data.url}
                </a>
              </div>

              <div>
                <span>{`${data.points} points`}</span> by{" "}
                <Link to={`/user/${data.author}`}>
                  <span>{data.author}</span>
                </Link>
                <span>
                  {` on ${new Date(data.created_at).toString().slice(0, 15)}`}
                </span>{" "}
              </div>
            </div>
            {data.children.length === 0 && (
              <div style={{ textAlign: "center", fontSize: 24 }}>
                No comments were found
              </div>
            )}
            <CommentContainer data={data} />
          </div>
        )}
      </Content>
      <Footer />
    </Layout>
  );
};

export default Article;

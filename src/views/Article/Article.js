import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { Footer, Header } from "../../components";
import * as api from "../../apis/article";

const loadingIcon = <LoadingOutlined style={{ fontSize: 80 }} spin />;
const { Content } = Layout;

const Article = () => {
  let { item_id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const getArticle = async (id) => {
      try {
        const res = await api.getArticle(id);
        setData(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    getArticle(item_id);
  }, [item_id]);

  console.log(data);

  return (
    <Layout>
      <Header />
      <Content className="h-content">
        {isLoading ? (
          <div style={{ textAlign: "center", margin: "50px 0" }}>
            <Spin indicator={loadingIcon} />
          </div>
        ) : (
          <div style={{ margin: "auto", maxWidth: 1800 }}></div>
        )}
      </Content>
      <Footer />
    </Layout>
  );
};

export default Article;

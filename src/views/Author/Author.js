import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { Footer, Header } from "../../components";
import * as api from "../../apis/author";

const loadingIcon = <LoadingOutlined style={{ fontSize: 80 }} spin />;
const { Content } = Layout;

const Author = () => {
  let { user_id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const getAuthor = async (id) => {
      try {
        const res = await api.getAuthor(id);
        setData(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    getAuthor(user_id);
  }, [user_id]);

  return (
    <Layout>
      <Header />
      <Content className="h-content">
        {isLoading ? (
          <div style={{ textAlign: "center", margin: "50px 0" }}>
            <Spin indicator={loadingIcon} />
          </div>
        ) : (
          <div style={{ margin: "auto", maxWidth: 1800, marginTop: 10 }}>
            <table border="0">
              <tbody>
                <tr className="athing">
                  <td valign="top">user:</td>
                  <td timestamp="1335249177">
                    <Link to={`/user/${data.username}`}>
                      <span>{data.username}</span>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td valign="top">created:</td>
                  <td>
                    <Link to="">{data.created_at}</Link>
                  </td>
                </tr>
                <tr>
                  <td valign="top">karma:</td>
                  <td>{data.karma} </td>
                </tr>
                <tr>
                  <td valign="top">about:</td>
                  <td dangerouslySetInnerHTML={{ __html: data.about }} />
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </Content>
      <Footer />
    </Layout>
  );
};

export default Author;

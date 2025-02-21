import React, { useEffect, useState } from "react";
import { Card, Table, Typography, Spin } from "antd";
import api from '../services/axiosInstance'
const { Title, Text } = Typography;

const History = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get("/url/history");
        setUrls(response.data.urls);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Original URL",
      dataIndex: "originalUrl",
      key: "originalUrl",
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          {url}
        </a>
      ),
    },
    {
      title: "Short URL",
      dataIndex: "shortUrl",
      key: "shortUrl",
      render: (shortUrl) => (
        <a href={`http://localhost:5000/${shortUrl}`} target="_blank" rel="noopener noreferrer" className="text-green-500 underline">
          {`http://localhost:5000/${shortUrl}`}
        </a>
      ),
    },
    {
      title: "Clicks",
      dataIndex: "clicks",
      key: "clicks",
      align: "center",
    },
  ];

  return (
    <div className="p-6">
      <Card className="shadow-md">
        <Title level={3} className="text-center font-bold">
          URL Shortening History
        </Title>
        {loading ? (
          <div className="flex justify-center items-center py-4">
            <Spin size="large" />
          </div>
        ) : urls.length === 0 ? (
          <Text type="secondary" className="block text-center">
            No URL history found.
          </Text>
        ) : (
          <Table dataSource={urls} columns={columns} rowKey="_id" pagination={{ pageSize: 5 }} />
        )}
      </Card>
    </div>
  );
};

export default History;

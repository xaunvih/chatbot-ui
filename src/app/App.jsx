import "antd/dist/reset.css";
import data from "./data-law.json";
import { Card, Form, Input, Table } from "antd";
import { Fragment } from "react";
import { useState } from "react";

const { Column } = Table;

const dataNew = data[0].rows.map((item) => {
  return {
    ID: item[0],
    Name: item[1],
    Object: item[2],
    Fines: item[3],
    Additional_Penalties: item[4],
    Remedial_Measures: item[5],
    Other_Penalties: item[6]
  };
});

function App() {
  const [list, setList] = useState(dataNew);
  function onFinish(values) {
    const newList = list.filter((item) => {
      return item.Name.includes(values.search);
    });
    setList(newList);
  }

  return (
    <Fragment>
      <Card style={{ marginBottom: 8 }}>
        <Form onFinish={onFinish}>
          <Form.Item name="search">
            <Input type="search" placeholder="Enter name for search" />
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <Table
          dataSource={list}
          rowKey="ID"
          pagination={{ position: ["topRight", "bottomRight"] }}
        >
          <Column title="ID" dataIndex="ID" />
          <Column title="Name" dataIndex="Name" />
          <Column title="Object" dataIndex="Object" />
          <Column title="Fines" dataIndex="Fines" />
          <Column
            title="Additional_Penalties"
            dataIndex="Additional_Penalties"
          />
          <Column title="Other_Penalties" dataIndex="Other_Penalties" />
        </Table>
      </Card>
    </Fragment>
  );
}

export default App;

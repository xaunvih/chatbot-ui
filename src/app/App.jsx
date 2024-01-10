import "antd/dist/reset.css";
import data from "./data-law.json";
import { Button, Card, Form, Input, Space, Table } from "antd";
import { Fragment } from "react";
import { useState } from "react";
import Highlighter from "react-highlight-words";

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
  const [form] = Form.useForm();
  function onFinish(values) {
    const keyword = String(values.search).toLocaleLowerCase();
    const newList = dataNew.filter((item) => {
      return item.Name.toLocaleLowerCase().includes(keyword);
    });
    setList(newList);
  }

  return (
    <Fragment>
      <Card style={{ marginBottom: 8 }}>
        <Form form={form} onFinish={onFinish} autoComplete="off">
          <Form.Item name="search">
            <Input type="search" placeholder="Enter name for search" />
          </Form.Item>
        </Form>
        <Space>
          <Button type="primary" style={{ width: 150 }} onClick={form.submit}>
            Search
          </Button>
          <Button
            style={{ width: 150 }}
            onClick={() => {
              setList(dataNew);
              form.resetFields();
            }}
          >
            Reset
          </Button>
        </Space>
      </Card>
      <Card>
        <Table
          dataSource={list}
          rowKey="ID"
          pagination={{ position: ["topRight", "bottomRight"] }}
        >
          <Column title="ID" dataIndex="ID" />
          <Column
            title="Name"
            dataIndex="Name"
            render={(name) => {
              return (
                <Highlighter
                  highlightStyle={{ backgroundColor: "yellow" }}
                  searchWords={[form.getFieldValue("search")]}
                  autoEscape={true}
                  textToHighlight={name}
                />
              );
            }}
          />
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

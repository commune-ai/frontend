import React from 'react';
import { Form, Input, Button, Checkbox, Select } from 'antd';

const { Option } = Select;

interface FormData {
    name: string;
    url: string;
    image: string;
    description: string;
    registerKey: string;
    verified: boolean;
    tags: string[];
}

const RegisterForm: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = (values: FormData) => {
        console.log('Success:', values);
        // Handle the submission logic here
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
            name="register-form"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
                image: '/img/frontpage/comai-logo.png',
                verified: false,
                tags: [],
            }}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input the name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="URL"
                name="url"
                rules={[{ required: true, message: 'Please input the URL!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Image"
                name="image"
                rules={[{ required: true, message: 'Please input the image URL!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input the description!' }]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="Register Key"
                name="registerKey"
                rules={[{ required: true, message: 'Please input the register key!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="verified"
                valuePropName="checked"
            >
                <Checkbox>Verified</Checkbox>
            </Form.Item>

            <Form.Item
                label="Tags"
                name="tags"
            >
                <Select mode="multiple" placeholder="Select tags">
                    <Option value="stats">stats</Option>
                    <Option value="staking">staking</Option>
                    <Option value="wallet">wallet</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;

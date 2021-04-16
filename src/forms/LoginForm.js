import { Form, Input, Button, Card, message } from 'antd';
import {requestTuikeApi} from "../api/requests";
import {Result, TuikeAccountApi} from "../api/consts";

const layout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 18,
	},
};
const tailLayout = {
	wrapperCol: {
		sm: {
			offset: 6,
			span: 2,
		}
	},
};

const isPkuMail = (email) => {
	if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
		return false;
	return email.endsWith("pku.edu.cn");
}

function LoginForm() {
	const [form] = Form.useForm();

	const onRequestAuthCode = () => {

	}

	const onFinish = (values) => {

	}


	const requestAuthCode = async () => {
		const values = form.getFieldsValue(["email"]);
		const email = values.email;
		if (!email || !isPkuMail(email)) {
			message.error("请输入北大邮箱!");
			return false;
		}
		const response = await requestTuikeApi(TuikeAccountApi.REQUEST_AUTH_CODE, {
			"email": email
		});
		console.log(response);
		if (response["result"] === Result.SUCCESS){
			message.success("验证码已发到" + email);
		} else {
			message.warn("系统出错，请重试");
		}
	}

	return (
		<Card title={"登陆"}>
		<Form
			{...layout}
			form={form}
			onFinish={onFinish}
		>
			<Form.Item
				label="北大邮箱"
				name="email"
				rules={[{
					required: true,
					message: "请输入北大邮箱!"
				}]}
			>
				<Input/>
			</Form.Item>
			<Form.Item
				label="验证码"
				name="auth_code"
				rules={[{
					required: true,
					message: "请输入验证码!"
				}]}
			>
				<Input.Group compact>
					<Input style={{width: '60%'}} maxLength={6}/>
					<Button style={{width: '35%', marginLeft: '5%'}} type="default" onClick={requestAuthCode}>
						获取验证码
					</Button>
				</Input.Group>
			</Form.Item>
			<Form.Item {...tailLayout}>
				<Button type="primary" htmlType="submit">
					登陆
				</Button>
			</Form.Item>
		</Form>
		</Card>
	)
}

export default LoginForm;
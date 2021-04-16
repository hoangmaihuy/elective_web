import LoginForm from "../forms/LoginForm";
import {Content} from "antd/es/layout/layout";
import {Row, Col} from 'antd';

const layout = {
	xs: {
		span: 20,
		offset: 2,
	},
	sm: {
		span: 16,
		offset: 4,
	},
	md: {
		span: 12,
		offset: 6,
	},
	lg: {
		span: 8,
		offset: 8,
	}
}

function LoginPage() {
	return (
		<Content>
			<Row type="flex" align="middle" style={{minHeight: '90vh'}}>
				<Col {...layout}>
					<LoginForm />
				</Col>
			</Row>
		</Content>
	)
}

export default LoginPage;
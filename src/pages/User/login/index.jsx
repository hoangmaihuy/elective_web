import {
  MailOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage } from 'umi';
import { requestVerificationCode } from '@/services/login';
import styles from './index.less';
import {Result as ApiResult} from '@/services/consts'

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [type, setType] = useState('email');
  const intl = useIntl();

  const handleSubmit = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values);
          return Promise.resolve();
        }}
      >
        {status === 'error' && loginType === 'email' && !submitting && (
          <LoginMessage content="验证码错误" />
        )}
        {type === 'email' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MailOutlined className={styles.prefixIcon} />,
              }}
              name="email"
              placeholder={intl.formatMessage({
                id: 'pages.login.email.placeholder',
                defaultMessage: '北大邮箱',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.email.required"
                      defaultMessage="请输入北大邮箱！"
                    />
                  ),
                },
                {
                  type: 'email',
                  message: (
                    <FormattedMessage
                      id="pages.login.email.invalid"
                      defaultMessage="邮箱格式错误！"
                    />
                  ),
                },
              ]}
            />
            <ProFormCaptcha
              phoneName='email'
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.captcha.placeholder',
                defaultMessage: '请输入验证码',
              })}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${intl.formatMessage({
                    id: 'pages.getCaptchaSecondText',
                    defaultMessage: '获取验证码',
                  })}`;
                }

                return intl.formatMessage({
                  id: 'pages.login.emailLogin.getVerificationCode',
                  defaultMessage: '获取验证码',
                });
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.captcha.required"
                      defaultMessage="请输入验证码！"
                    />
                  ),
                },
              ]}
              onGetCaptcha={async (email) => {
                const {result} = await requestVerificationCode(email);
                if (result !== ApiResult.SUCCESS) {
                  message.error(intl.formatMessage({
                    id: `error.${result}`,
                    defaultMessage: '系统出错，请重试',
                  }))
                  return;
                }
                message.success('获取验证码成功，请查看邮箱！');
              }}
            />
          </>
        )}
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
          </ProFormCheckbox>
        </div>
      </ProForm>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);

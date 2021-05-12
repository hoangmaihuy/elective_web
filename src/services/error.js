const ErrorMessage = {
	success: "操作成功",
	error_request: "请求失败，请重试",
	error_invalid_email: "邮箱不合法",
	error_authorization: "请登录",
	error_verification_code: "验证码不正确",
  error_class_not_exist: "课程班不存在",
}

const getErrorMessage = (error) => {
    return ErrorMessage[error];
}

export default getErrorMessage;

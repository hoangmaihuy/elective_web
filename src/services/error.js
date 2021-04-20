const ErrorMessage = {
	success: "操作成功",
	error_request: "请求失败",
	error_invalid_email: "邮箱不合法",
	error_authorization: "没有权限",
	error_verification_code: "验证码不正确",
}

const getErrorMessage = (error) => {
    return ErrorMessage[error];
}

export default getErrorMessage;
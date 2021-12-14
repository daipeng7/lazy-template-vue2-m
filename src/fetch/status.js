/*
 * @Author:
 * @Date: 2019-07-11 10:10:13
 * @LastEditors: VSCode
 * @LastEditTime: 2019-11-26 16:38:39
 * @Description: response status
 */

export const ResSuccessCode = {
	SUCCES: 0, // 响应成功
	SERVER_SUCCES: 200 // 响应成功
};

export const ResErrorCode = {
	FAIL: 1, // 响应失败
	CAPTCHA_ERROR: 2, // 验证码错误
	PARAM_ERROR: 422, // 参数错误
	USER_AUTH_FAIL: 101, // 用户认证失败
	USER_AUTH_EXPIRED: 401, // 用户身份信息过期
	USER_RIGTHS_FAIL: 103, // 该用户无权限
	ACCOUNT_DISABLE: 402, // 该账号被禁用
	SERVER_ERROR: 500, // 服务器错误
	ACCOUNT_ERROR: 1000 // 账号或密码错误
};

// 自定义响应状态码map
export const CustomCodeMap = {
	success: [
		ResSuccessCode.SUCCES
	],
	error: [
		ResErrorCode.FAIL,
		ResErrorCode.CAPTCHA_ERROR,
		ResErrorCode.PARAM_ERROR,
		ResErrorCode.USER_AUTH_FAIL,
		ResErrorCode.USER_AUTH_EXPIRED,
		ResErrorCode.USER_RIGTHS_FAIL,
		ResErrorCode.ACCOUNT_DISABLE,
		ResErrorCode.ACCOUNT_ERROR
	]
};

// 系统响应状态码map
export const SystemCodeMap = {
	success: [
		ResSuccessCode.SERVER_SUCCES
	],
	error: [
		ResErrorCode.SERVER_ERROR
	]
};

export const StatusMap = {
	[ResSuccessCode.SUCCES]: { message: '响应成功', relogin: false, useLocalMessage: false, type: 'success' },
	[ResErrorCode.FAIL]: { message: '响应失败', relogin: false, useLocalMessage: false, type: 'fail' },
	[ResErrorCode.CAPTCHA_ERROR]: { message: '验证码错误', relogin: false, useLocalMessage: false, type: 'fail' },
	[ResErrorCode.PARAM_ERROR]: { message: '参数错误', relogin: false, useLocalMessage: false, type: 'fail' },
	[ResErrorCode.USER_AUTH_FAIL]: { message: '身份认证失败', relogin: true, useLocalMessage: false, type: 'fail' },
	[ResErrorCode.USER_AUTH_EXPIRED]: { message: '身份信息过期', relogin: true, useLocalMessage: false, type: 'fail' },
	[ResErrorCode.USER_RIGTHS_FAIL]: { message: '权限不足请联系管理员', relogin: false, useLocalMessage: false, type: 'fail' },
	[ResErrorCode.SERVER_ERROR]: { message: '服务器内部错误，请刷新重试！', relogin: false, useLocalMessage: false, type: 'fail' },
	[ResErrorCode.ACCOUNT_DISABLE]: { message: '该账号被禁用', relogin: true, useLocalMessage: false, type: 'fail' },
	[ResErrorCode.ACCOUNT_ERROR]: { message: '账号或密码错误', relogin: false, useLocalMessage: false, type: 'fail' }
};

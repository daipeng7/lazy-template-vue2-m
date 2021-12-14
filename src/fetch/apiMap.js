
/*
 * @Author:
 * @Date: 2018-09-03 18:31:30
 * @LastEditors: daipeng7
 * @LastEditTime: 2021-12-14 13:57:41
 * @Description: 接口map，可分割
 * @Company:
 */
import request from '@/fetch/request';
const { get, post, put } = request;
const apiMap = {
	/**
     * basic
     */
	getCaptCha: get('/captcha'), // 验证码
	register: post('/account/register'), // 注册
	login: post('/account/login') // 登录

};

export default apiMap;

import Vue from "vue";
import VueRouter from "vue-router";
import { delAllStorage } from "@/utils/common";

Vue.use(VueRouter);
const routes = [
	
	{
		path: "/web/login",
		name: "login",
		component: () => import("../views/login/Login.vue"),
		meta: {
			state: false,
			level: 1,
		},
	},
	{
		path: "/",
		component: () => import("../views/Menu.vue"),
		redirect: { path: "/web/login" },
		children: [
			
			// 首页
			{
				path: "/web/home",
				name: "home",
				component: () => import("../views/home/home.vue"),
				meta: {
					state: true,
					level: 1,
				},
			},
			// 账号管理
			//注销
			{
				path: "/web/operate/accountLogout",
				name: "operate/accountLogout",
				component: () => import("../views/accountManagement/accountLogout.vue"),
				meta: {
					state: true,
					level: 1,
				},
			},
			// 账号列表
			{
				path: "/web/operate/accountList",
				name: "operate/accountList",
				component: () => import("../views/accountManagement/accountList.vue"),
				meta: {
					state: true,
					level: 1,
				},
			},
			// 账号列表
			{
				path: "/web/operate/compAgencyAccountList",
				name: "operate/compAgencyAccountList",
				component: () => import("../views/accountManagement/compAgencyAccountList.vue"),
				meta: {
					state: true,
					level: 1,
				},
			},
			// 账号编辑
			{
				path: "/web/operate/compAgencyBindList",
				name: "operate/compAgencyBindList",
				component: () => import("../views/accountManagement/compAgencyBindList.vue"),
				meta: {
					state: false,
					level: 2,
				},
			},
			// 账号编辑
			{
				path: "/web/operate/accountEdit",
				name: "operate/accountEdit",
				component: () => import("../views/accountManagement/accountEdit.vue"),
				meta: {
					state: false,
					level: 2,
				},
			},
			// 角色列表
			{
				path: "/web/operate/roleList",
				name: "operate/roleList",
				component: () => import("../views/accountManagement/roleList.vue"),
				meta: {
					state: true,
					level: 1,
				},
			},
			// 创建/编辑角色
			{
				path: "/web/operate/createRoleType",
				name: "operate/createRoleType",
				component: () =>
					import("../views/accountManagement/createRoleType.vue"),
				meta: {
					state: false,
					level: 2,
				},
			},
			// 权限管理
			{
				path: "/web/operate/rightsManagement",
				name: "operate/rightsManagement",
				component: () =>
					import("../views/accountManagement/rightsManagement.vue"),
				meta: {
					state: true,
					level: 1,
				},
			},
		],
	},
	// other
	{
		path: "/web/*",
		redirect: { name: "login" },
	},

];

const router = new VueRouter({
	mode: "hash",
	base: process.env.BASE_URL,
	routes
});

// 防止在当前页面跳转时报：vue-router报错Uncaught (in promise)；在升级了Vue-Router版本到到3.1.0及以上之后，页面在跳转路由控制台会报Uncaught (in promise)的问题，
// 在3.1.0版本里面新增功能：push和replace方法会返回一个promise, 你可能在控制台看到未捕获的异常。
// 对Router原型链上的push、replace方法进行重写，这样就不用每次调用方法都要加上catch
// 在router.js加入以下内容：
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
	return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
	// console.log(to);
	const token = sessionStorage.getItem("token") || "";
	// 权限导航
	if (to.name === "login") {
		// 直打登录 清缓存
		delAllStorage();
		next();
	} else if (!token) {
		if (to.name == "zhengzhouH5/ExaminationDetails" || to.name == "zhengzhouH5/logs" || to.name == "zhengzhouH5/logs2" || to.name == "zhengzhouH5/userFaceLogs") {
			next();
		} else if (to.name == "zhengzhouH5/detailResource") {
			next();
		} else if (to.name == "zhengzhouH5/videoMenu") {
			next();
		}  else {
			next({ path: "/web/login" });
		}
	} else if (JSON.parse(sessionStorage.getItem("userJson")).passwordExpire) {
		if (to.name != "operate/change") {
			next({ path: "/web/login" });
			location.reload()
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;  
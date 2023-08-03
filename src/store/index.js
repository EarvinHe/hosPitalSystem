import Vue from "vue";
import Vuex from 'vuex';
// 需要使用该插件
Vue.use(Vuex);

// ；引入小仓库
import user from "./user";
import dept from "./dept";
import drug from '@/store/drug'
import patient from '@/store/patient'
import log from '@/store/log'
import duty from '@/store/duty'
import notice from '@/store/notice'
import file from "./file";
import auth from '@/store/auth'
// 对外暴露一个Store实例：
export default new Vuex.Store({
    // 实现Vue仓库模块式开发存储器
    modules: {
        user,
        dept,
        drug,
        patient,
        log,
        duty,
        notice,
        file,
        auth
    }

})
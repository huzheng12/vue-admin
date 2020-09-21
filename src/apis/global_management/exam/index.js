import {request as axios}  from "@/utils/request/index.js";

export default {
    // 题目列表查询
    getExamList: ({limit, page, langCode}) => {
        return axios.request({
            url: '/exam/list',
            method: 'post',
            data: {
                limit, // 每页几行数据
                page, // 第几页
                langCode // 语种
            }
        })
    },
    // 添加
    addExam: ({ question, status, type, options, answer, langCode }) => {
        return axios.request({
            url: '/exam/add',
            method: 'post',
            data: {
                question, // 题目
                status, // 题目状态
                type, // 题目类型
                options, // 选项列表，以数组的形式传递
                answer, // 作为答案的选项，暂时只支持单选
                langCode // 语种
            }
        })
    },
    // 删除
    deleteExam: (ids) => {
        return axios.request({
            url: '/exam/delete',
            method: 'post',
            data: {
                ids // 要删除的题目Id（多个用,分隔）
            }
        })
    },
    // 查看
    seeExam: (id) => {
        return axios.request({
            url: '/exam/see',
            method: 'post',
            data: {
                id
            }
        })
    },
    // 新手考核设置提交
    infolist: () => {
        return axios.request({
            url: '/appconfig/page/examConfig',
            method: 'get'
        })
    },
}
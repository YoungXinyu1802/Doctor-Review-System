// 把所有的模块做统一处理
// 导出一个统一的方法 useStore
import React from "react"
import DepartmentStore from "./department.Store";

import { configure } from "mobx"
configure({
    enforceActions: "never",
})


class RootStore {
    constructor() {
        this.departmentStore = new DepartmentStore()
    }
}

// 实例化根
// 导出useStore context
const rootStore = new RootStore()
const context = React.createContext(rootStore)

const useStore = () => React.useContext(context)

export { useStore }

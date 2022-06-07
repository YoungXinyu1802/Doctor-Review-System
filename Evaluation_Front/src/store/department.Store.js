import { makeAutoObservable } from 'mobx'

class DepartmentStore {
    contentList={}
    departmentName=""
    dep_info=[]
    doctor_info=[]
    imageList=[]

    constructor() {
        makeAutoObservable(this)
    }

}
export default DepartmentStore;

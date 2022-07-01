import axiosInstance from '~/utils/axiosInstance'
import queryString from 'query-string'
class CategoryService{

    static getAll = (filter)=>axiosInstance.get(`categories?`+ (filter ? queryString.stringify(filter): ''))
    static create = (data)=>axiosInstance.post(`categories`, {...data})
    static update = (id,data)=>axiosInstance.put(`categories/${id}`, {...data})
    static delete = (id)=>axiosInstance.delete(`categories/${id}`)
}

export default CategoryService
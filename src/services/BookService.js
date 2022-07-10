import axiosInstance from '~/utils/axiosInstance'
import queryString from 'query-string'
class BookService{

    static getAll = (filter)=>axiosInstance.get(`books?`+ (filter ? queryString.stringify(filter): ''))
    static getAuthor = ()=>axiosInstance.get(`books/author`)
    static create = (data)=>axiosInstance.post(`categories`, {...data})
    static update = (id,data)=>axiosInstance.put(`categories/${id}`, {...data})
    static delete = (id)=>axiosInstance.delete(`categories/${id}`)
}

export default BookService
import { useState } from 'react'
import handle from '~/utils/handle'

export default function (service, defaultMessage) {
    const [res, setRes] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState({})
    const [openNotice, setOpenNotice] = useState(false)

    //Call API
    const callApi = (...data) => {
        (async () => {
            if (defaultMessage) {
                setOpenNotice(true)
            }
            setIsLoading(true)
            const res = await handle(service(...data))
            setIsLoading(false)
            if (res.err) {
                setMessage({
                    err: true,
                    message: res.data?.error.message || 'Có lỗi xảy ra! Vui lòng thử lại sau!',
                })
                setOpenNotice(true)
                return
            }
            if (defaultMessage) {
                setMessage({ message: defaultMessage })
            }
            setRes(res.data)
        })()
    }

    const disableNotice = () => {
        setOpenNotice(false)
        setMessage({})
    }
    return {
        res,
        isLoading,
        message,
        callApi,
        openNotice,
        disableNotice,
    }
}

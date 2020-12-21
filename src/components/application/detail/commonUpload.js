import axios from 'axios'
import {Message} from 'element-ui'

function upLoadFiles(file, uploadedFileList) {
    let filesArr = uploadedFileList.slice(-1);
    let fileList = filesArr.map(file => file.raw)
    let formData = new FormData()
    // 遍历上传文件
    for (let i = 0; i < fileList.length; i++) {
        formData.append('file', fileList[i])
    }

    return axios.post('/file/upload', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(res => {
        const code = res.data.code
        const message = res.data.message
        const data = res.data.data
        if (code === 1) {
            Message.success(message);
            return Promise.resolve(data);
        } else {
            Message.error(message);
        }
    })
}

export default upLoadFiles


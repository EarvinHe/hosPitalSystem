import { Message } from "element-ui"
export function showMessage(message){
    Message({
        type:'error',
        message:message
    })
}
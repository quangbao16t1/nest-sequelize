import { HttpStatus } from "@nestjs/common"

export const dateResult = (code, data, message, error) => {
    return ({
        statusCode: code,
        data: data, 
        message: message,
        error: error
    })
}

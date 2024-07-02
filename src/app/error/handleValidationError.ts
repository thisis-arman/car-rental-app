import mongoose from 'mongoose';
import { TErrorOrigin, TGenericErrorResponse } from './../interface/error';



const handleValidationError = (error: mongoose.Error.ValidationError): TGenericErrorResponse => {
    const errorOrigin: TErrorOrigin = Object.values(error.errors).map((value:mongoose.Error.ValidatorError|mongoose.Error.CastError) => {
        return {
            path: value?.path,
            message:value?.message
        }
        
    }) 

    const statusCode = 400;

    return {
        statusCode,
        message: "Validation error",
        errorOrigin
    }
    
}

export default handleValidationError;
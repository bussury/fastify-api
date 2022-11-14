import BaseDto from './../../models/BaseDto.js'

export default class UserDto extends BaseDto {

    constructor(src ={}) {
        super(src)

        this.username = src.username
        this.first_name = src.first_name
        this.middle_name = src.middle_name
        this.surname = src.surname
        this.role = src.role
        this.location = src.location
        // sensitive data
        // this.passwordHash = src.passwordHash
        // this.emailConfirmToken = src.emailConfirmToken
        // this.resetPasswordToken = src.resetPasswordToken
        this.newEmail = src.newEmail
        this.email = src.email

        delete this.userId
    }
    toJson(){
        // delete sensitive data from json
        // delete this.passwordHash
        // delete this.emailConfirmToken
        // delete this.resetPasswordToken
        delete this.newEmail
        delete this.email
        return this
    }
}
export class UserLikeAlreadyExistsError extends Error {
    constructor(){
        super('Este usuário já curtiu este item.')
    }
}
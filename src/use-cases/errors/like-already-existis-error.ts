export class LikeAlreadyExistsError extends Error {
    constructor(){
        super('Este usuário já curtiu este item.')
    }
}
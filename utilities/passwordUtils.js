import bcrypt from "bcryptjs"


export const hashPassword = async (originalPassword) => {
    try {
        return await bcrypt.hash(originalPassword,10)
    } catch (error) {
        console.log({where:"hashing password",error:error})
    }
}

export const comparePassword = async (originalPassword,hashedPassword) => {
    try {
        return await bcrypt.compare(originalPassword,hashedPassword)
    } catch (error) {
        console.log({where:"conparing password",error:error})
    }
}
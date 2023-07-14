import jwt from 'jsonwebtoken'

export function signJwtToken (payload, options= {}){
    const token = jwt.sign(payload,process.env.JWT_SECRET,options)
    return token;
}


export function  verifyJwtToken (token){
   try {
    const payload = jwt.verify(token,process.env.JWT_SECRET)
    return payload;

   } catch (error) {
    console.log(error)
    return null;
   }

}
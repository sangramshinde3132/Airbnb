import jwt from 'jsonwebtoken';
const getToken = async(userId) => {
    // Logic to generate a token (e.g., JWT) using the userId
    try {
         const token = await jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1d'});
         return token;
    } catch (error) {
        console.log("error while generating token", error);
    }
   
}

export default getToken;
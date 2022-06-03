const generateRandomString = (num) =>{
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for(let i = 0; i < num; i++){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};

const random = () =>{
    return Math.floor((Math.random() * (20 - 10 + 1)) + 10);
}
const secreto = generateRandomString(random());

 

module.exports = secreto;
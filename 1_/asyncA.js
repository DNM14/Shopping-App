const axios = require('axios');

console.log(new Date().getTime());
console.log(3 + 7);
console.log(new Date().getTime());
console.log(3 + 7);
console.log(new Date().getTime());
const func = async function () {
    return await axios.get('https://jsonplaceholder.typicode.com/users');
}

func().then(response => {
    console.log(response.data.map(user => user.id));
    console.log(new Date().getTime());
});
console.log(new Date().getTime());

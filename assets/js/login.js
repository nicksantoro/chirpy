document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const password = document.querySelector('#inputPassword').value;
        const email = document.querySelector('#inputEmail').value;
    
        axios.post('http://localhost:3000/users/login', {
            email,
            password
        })
        .then( user => {
            console.log(user);
            
        })
        .catch( error => {
            console.error(error);
        })
    })
    // let loginForm = document.querySelector('#login-form')
    // loginForm.addEventListener('submit', ()=> {
    //     let userName = document.querySelector('#inputEmail');
    //     let passWord = document.querySelector('#inputPassword');
    //     axios.get('place holder').then(result => {
    //         if(result.error) {
    //             return Error;
    //         } else {
    //             localStorage.setItem('user', result)
    //             window.location.replace('index.html')
    //         }
    //     })
    // })
})


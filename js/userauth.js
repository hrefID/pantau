var loginUsername = document.querySelector('.login-username');
var loginPassword = document.querySelector('.login-password');
var userAuth = [
  {
    user: 'elian',
    pass: '123'
  },
  {
    user: 'admin',
    pass: 'admin'
  },
]
var userLogin = false;
document.addEventListener('DOMContentLoaded', ()=>{
  if (localStorage.getItem('username') !== null){
    window.location.href = '/dashboard.html';
    // console.log(localStorage.getItem('username'));
  }
})

document.querySelector('.login-submit').addEventListener('click', (e)=>{
  e.preventDefault();
  if (loginUsername.value == '' || loginPassword.value == ''){
    alert('Please insert all fields!');
  } else{
    userAuth.forEach((a)=>{
      if (loginUsername.value == a.user && loginPassword.value == a.pass) userLogin = true;
    })
    
    if (userLogin) {
      localStorage.setItem( "username", loginUsername.value );
      window.location.href = "/dashboard.html";

    }
    else alert('Username or Password is incorrect! Please try again!');
  }
})
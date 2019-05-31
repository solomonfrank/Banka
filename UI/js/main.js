/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */



async function fetchData({
  url, jsonifyBody, method, href,
}) {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-type': 'application/json',
    },

    body: jsonifyBody,

  });
  console.log(response);
  const result = await response.json();
  let resultJson = result.data[0];
  console.log(resultJson);
  if (!response.ok) {
    console.log(response.statusText);

    document.querySelector('.error-flash').textContent = result.data;

  } else {
    window.location.href = href;
  }
}

if (document.querySelector('#signin-btn')) {
  document.querySelector('#signin-btn').addEventListener('click', (event) => {

    const json = {

      password: document.querySelector('#password').value,
      email: document.querySelector('#email').value,
    };

    const jsonifyBody = JSON.stringify(json);

    const params = {
      url: 'https://banka-api-app.herokuapp.com/api/signin',
      jsonifyBody,
      method: 'Post',
      href: './user-create-account.html',
    };

    fetchData(params).catch(err => console.log(err.stack));
    event.preventDefault();
  });
}


if (document.querySelector('#signupBtn')) {
  document.querySelector('#signupBtn').addEventListener('click', (event) => {
    const json = {
      firstName: document.querySelector('#firstName').value,
      lastName: document.querySelector('#lastName').value,
      password: document.querySelector('#password').value,
      confirmPassword: document.querySelector('#confirmPassword').value,
      gender: document.querySelector('#gender').value,
      email: document.querySelector('#email').value,
    };
    const jsonifyBody = JSON.stringify(json);
    console.log(jsonifyBody);

    const params = {
      url: 'https://banka-api-app.herokuapp.com/api/signup',
      jsonifyBody,
      method: 'Post',
      href: './signin.html',
    };

    fetchData(params).catch(err => console.log(err.stack));
    event.preventDefault();

  });
}


document.addEventListener('DOMContentLoaded', () => {
  window.onscroll = () => {
    const nav_value = document.querySelector('.top-nav-wrapper').offsetHeight;
    const second_nav = document.querySelector('.second-nav');

    const list_burger = document.querySelector('.icon > li');

    if (window.scrollY >= nav_value) {
      second_nav.classList.add('open');

      list_burger.classList.add('open');
      // second_nav.style.backgroundColor= "red";
    } else {
      second_nav.classList.remove('open');
      list_burger.classList.remove('open');
      // document.querySelector('.icon').remove('open');
    }
  };


  // signin xhr request
});




document.querySelector('.burger-list').onclick = () => {
  document.querySelector('.sidebar').classList.toggle('side');
};




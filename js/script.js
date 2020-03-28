window.addEventListener('DOMContentLoaded', () => {

  const button = document.querySelector('button');
  const form = document.querySelector('form');

  // XHR methods of get and post data

  // GET request
  function reqGetXHR() {
    let request = new XMLHttpRequest();

    request.open('GET', 'http://localhost:3000/people');
    request.setRequestHeader('Content-type', 'application/json; utf-8');
    request.send();

    request.addEventListener('load', function() {
      if (request.status === 200) {
        let data = JSON.parse(request.response);
        displayCards(data);
        button.remove();
      } else {
        console.error('ERROR', request.status);
      }
    });
  }

  // POST request with json server
  function reqPostJsonXHR(e) {
    e.preventDefault();

    let request = new XMLHttpRequest();

    // Form data
    let formData = new FormData(form);
    formData.append("id", Math.random());
    let dataObj = {};
    formData.forEach((value, key) => {
      dataObj[key] = value;
    });
    let jsonDataObj = JSON.stringify(dataObj);

    request.open('POST', 'http://localhost:3000/people');
    request.setRequestHeader('Content-type', 'application/json; utf-8');
    request.send(jsonDataObj);
  }

  // POST request with php
  function reqPostPhpXHR(e) {
    e.preventDefault();

    let request = new XMLHttpRequest();

    // Form data
    let formData = new FormData(form);

    request.open('POST', './api.php');
    request.send(formData);
    request.addEventListener('load', () => {
      console.log(request.response);
    });
  }

  // Fetch method of get and post data

  // GET request
  async function getDataFetch(url) {
    const result = await fetch(url);

    if(!result.ok) {
      throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
  }

  function reqGetFetch() {
    getDataFetch('http://localhost:3000/people')
      .then(data => displayCards(data))
      .catch(error => console.error(error));
    this.remove();
  }

  // POST request with json server
  async function postDataJsonFetch(url, data) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return res.json();
  }

  function reqPostJsonFetch(e) {
    e.preventDefault();

    // Form data
    let formData = new FormData(form);
    formData.append("id", Math.random());
    let dataObj = {};
    formData.forEach((value, key) => {
      dataObj[key] = value;
    });

    postDataJsonFetch('http://localhost:3000/people', dataObj)
      .catch(error => console.error(error));
  }

  // POST request with php
  async function postDataPhpFetch(url, data) {
    const res = await fetch(url, {
      method: "POST",
      body: data
    });

    return res.text();
  }

  function reqPostPhpFetch(e) {
    e.preventDefault();

    // Form data
    let formData = new FormData(form);

    postDataPhpFetch('./api.php', formData)
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  // Axios methods of get and post data

  // GET request
  async function getDataAxios(url) {
    const result = await axios(url);

    if(result.status !== 200) {
      throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return result;
  }

  function reqGetAxios() {
    getDataAxios('http://localhost:3000/people')
      .then(data => displayCards(data.data))
      .catch(error => console.error(error));
    this.remove();
  }

  // POST request with json server
  function reqPostJsonAxios(e) {
    e.preventDefault();

    // Form data
    let formData = new FormData(form);
    formData.append("id", Math.random());
    let dataObj = {};
    formData.forEach((value, key) => {
      dataObj[key] = value;
    });

    axios.post('http://localhost:3000/people', dataObj)
      .catch(error => console.error(error));
  }

  // POST request with php
  function reqPostPhpAxios(e) {
    e.preventDefault();

    // Form data
    let formData = new FormData(form);

    axios({
      method: 'post',
      url: './api.php',
      data: formData
    })
      .then(data => console.log(data.data))
      .catch(error => console.error(error));
  }

  // Display cards
  function displayCards(data) {
    data.forEach(item => {
      let card = document.createElement('div');
      card.classList.add('card');

      let icon = item.sex === 'male' ? 'icons/mars.png' : 'icons/female.png';

      card.innerHTML = `
        <img src = "${item.photo}" alt="${item.name} ${item.surname}">
        <div class="name">${item.name} ${item.surname}</div>
        <div class="sex"><img src="${icon}" alt="${item.sex}"></div>
        <div class="age">${item.age}</div>
      `;
      document.querySelector('.app').appendChild(card);
    })
  }

  // button.addEventListener('click', reqGetXHR, {'once': true});
  // form.addEventListener('submit', (e) => reqPostJsonXHR(e), {'once': true});
  // form.addEventListener('submit', (e) => reqPostPhpXHR(e), {'once': true});
  // button.addEventListener('click', reqGetFetch, {'once': true});
  // form.addEventListener('submit', (e) => reqPostJsonFetch(e), {'once': true});
  // form.addEventListener('submit', (e) => reqPostPhpFetch(e), {'once': true});
  // button.addEventListener('click', reqGetAxios, {'once': true});
  // form.addEventListener('submit', (e) => reqPostJsonAxios(e), {'once': true});
  // form.addEventListener('submit', (e) => reqPostPhpAxios(e), {'once': true});

});
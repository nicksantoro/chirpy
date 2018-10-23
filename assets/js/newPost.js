axios.post('/user', {
    user_id: 10 ,
    title: 'New Post',
    body: 'Server Side Programming',
    type: 'text'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });



// let input = document.querySelector('#the-input').value
//   console.log(input)```
// (edited)

// <input id="the-input" type="text" name="" value="">


// user_id: 1,
// title: 'title post',
// body: 'hello world, this is my post.',
// type: 'text'
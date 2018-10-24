const formButton = document.getElementById('formButton');
const newPost = document.getElementById('newPost');
const formDiv = document.getElementById('form-div');
const hideForm = document.getElementById('hideForm');



let setUser = function() {
    let currentUser = JSON.parse(localStorage.getItem("user")); 
    document.getElementById("currentUser").innerHTML = currentUser.profile_name;
}

window.addEventListener("DOMContentLoaded", setUser);

let isEdit = null;

hideForm.style.display = "none"

newPost.addEventListener('click', () => {
    formDiv.style.display = "unset";
    hideForm.style.display = "unset"
    isEdit = null;
})

hideForm.addEventListener('click', () => {
    const title = document.getElementById('formTitle');
    const body = document.getElementById('formContent');
    const type = document.getElementById('formType');
    title.value = "";
    body.value = "";
    type.value = "";
    newPost.style.display = "unset";
    formDiv.style.display = "none";
    hideForm.style.display = "none";
    isEdit = null;
})

const deletePost = (event) => {

    console.log(typeof event.target.id);
    let id = Number(event.target.id);
    axios.delete(`http://localhost:3000/content/${id}`).then(results => {
        

        console.log(results);
        showPosts();
    })
}

const editPost = (id) => {
    console.log(id);
    axios.get(`http://localhost:3000/content/${id}`).then(results => {

        formDiv.style.display = "unset";
        const title = document.getElementById('formTitle');
        const body = document.getElementById('formContent');
        const type = document.getElementById('formType');
        const content = results.data[0];
        isEdit = content.id;
        title.value = content.title;
        body.value = content.body;
        type.value = content.type;
        console.log(results);

    })
}

const showPosts = () => {
    axios.get('http://localhost:3000/content')
        .then(results => {
            const list = document.getElementById('showPosts');
            list.innerHTML = '';
            results.data.forEach(content => {
                list.innerHTML += renderPost(content);
            })
        }).catch(err => {
            const list = document.getElementById('showPosts');
            list.innerHTML = `<div></div>`;
        })
    grabFriends(1);
}


//////// FORM //////////

formButton.addEventListener('click', () => {
    // CHECK IF USER IS LOGGED IN
    /**
     * {
        "id": 17,
        "user_id": 1,
        "title": "title post",
        "body": "hello world, this is my post.",
        "type": "text",
        "created_at": "2018-10-12T02:28:12.907Z",
        "updated_at": "2018-10-12T02:28:12.907Z"
        }
     */
    const title = document.getElementById('formTitle');
    const body = document.getElementById('formContent');
    const type = document.getElementById('formType');

    if (isEdit !== null) {
        axios.put(`http://localhost:3000/content/${isEdit}`, {
            title: title.value,
            body: body.value,
            type: type.value,
            /// local storage.......
            user_id: 1
        }).then(data => {
            isEdit = null;
            formDiv.style.display = "none";
            title.value = "";
            body.value = "";
            type.value = "";
            showPosts();
        }).catch(error => {
            console.error(error);
        })
        return;
    }

    //////// ----------- UPDATE USER ID ------------ //////////

    axios.post('http://localhost:3000/content', {
            title: title.value,
            body: body.value,
            type: type.value,
            user_id: 1
        })
        .then(result => {
            console.log(result);
            title.value = '';
            body.value = '';
            type.value = '';
            showPosts();
        })
        .catch(error => {
            console.error(error);
        })
})



const renderPost = (content) => {
    return `
    <div class="card w-100 border border-primary borderStyle">
    <div class="card-body card-body-${content.id}">
      <h5 class="card-text" style="color:purple">${content.title}</h5>
      <br>
      <p class="card-text">${content.body}</p>
      <br>
      <small class="text-muted">
        <cite>${content.type}</cite>
      </small>
      <br>
      <br>
      <div class="text-right">
      <i onClick="editPost(${content.id})" class="far fa-edit fa-1x mr-2"></i>
      <i id=${content.id} onClick="deletePost(event)" class="fas fa-times fa-1x text-danger"></i>
      </div>
    </div>
    </div>
  <span class="border-bottom-0"></span>
  <br>
    `
}



// FRIENDS


const grabFriends = (id) => {
    axios.get(`http://localhost:3000/users/${id}/followers`).then(result => {
        const list = document.getElementById('friendList');
        list.innerHTML = "";
        result.data.forEach(friend => {
            list.innerHTML += renderFriend(friend);
        })
    }).catch(error => {

    })

}

const renderFriend = (friend) => {
    return `<li class="list-group-item text-center border border-primary">
                <i class="fal fa-smile-wink fa-3x p-3" style="color:purple"></i>
                <p>${friend.profile_name}</p>
                <p class="text-secondary">${friend.city}</p>
                <i id="deleteFriend" class="fal fa-skull-crossbones fa-1x text-danger" onClick="deleteFriend(event)"></i>
            </li>`
}

const deleteFriend = (event) => {
    let id = Number(event.target.id);
    axios.delete(`http://localhost:3000/users/${id}/followers`).then(results => {

        console.log(results);
        showPosts();
    })
}

// <img class="rounded" src="http://placehold.it/50/50" alt="${friend.first_name} ${friend.last_name}">


/**
 * INITIALIZE FUNCTION
 */
showPosts();


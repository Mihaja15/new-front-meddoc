import urlConf from '../config';

export const userService = {
    login,
    logout,
    register,
    getById,
    update,
    loginMeddoc
};

function login(username, password) {
    const userAuth = {
        identification: username,
        mdp: password
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userAuth)
    };

    return fetch(urlConf()+'/users/login', requestOptions)
        .then(handleResponse)
        .then(user => {
            //console.log(user);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}
function loginMeddoc(username, password) {
    const userAuth = {
        identification: username,
        mdp: password
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userAuth)
    };

    return fetch(urlConf()+'/users/loginMeddoc', requestOptions)
        .then(user => {
            //console.log(user);
        });
}
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getById(id) {
    const requestOptions = {
        method: 'GET'
        // headers: authHeader()
    };

    return fetch(urlConf()+`/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(urlConf()+'/users/signin', requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        // headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(urlConf()+`/users/${user.id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
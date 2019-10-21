const apiKey = "0b1725d2-13f7-4c39-8b48-fc91fe7d3a60";
const apiString = "?api_key=" + apiKey;

function apiGetComments() {
    return axios
        .get('https://project-1-api.herokuapp.com/comments' + apiString)
        .then(response => response.data);
}
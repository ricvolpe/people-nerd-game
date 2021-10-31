export function ApiCall() {
    fetch("http://localhost:5000/api")
        .then(res => res.json())
        .then(res => console.log(res[0]));
}
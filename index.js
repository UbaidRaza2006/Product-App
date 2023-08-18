import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
import { collection, getDocs, getFirestore, addDoc, query, onSnapshot } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getDownloadURL, getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCbh8mSIAKBFC4oXoTscLgrnXRbujmXEQU",
    authDomain: "hakathon-practice.firebaseapp.com",
    projectId: "hakathon-practice",
    storageBucket: "hakathon-practice.appspot.com",
    messagingSenderId: "196171728036",
    appId: "1:196171728036:web:b8afb89710629a473fd231",
    measurementId: "G-PVD3BSSS5X"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


// data showing

// console.log("adkjahsj");
// const getdata = async () => {
    const q = query(collection(db, "prodcuts"));
    onSnapshot(q, (onSnapshot) => {
        onSnapshot.forEach((doc) => {
            // Get products collection data
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);

            // For Image
            getDownloadURL(ref(storage, `${doc.data().price}${doc.data().name}${doc.data().description}`))
                .then((url) => {
                    // For Showing Card
                    document.getElementById("product").innerHTML +=
//  `
             
// // //                     <img alt="Image" src="${url}" id="imgs">
// // //                     <p>${doc.data().name} </p>
// // //                     <p>$${doc.data().price}</p>
// // //                     <button id="butn" onclick='detail("${url}","${doc.data().name}" , "${doc.data().price}")'>Add To Bag</button>`
    
`
                    <div id="main-div-card">

                    <img id="card-img" id= "imgs"src="${url}" alt="Nhi Arahi">
                    <h2>${doc.data().name}</h2>
                    <h4><u>$${doc.data().price}</u></h4>
                    <button id="add-btn" id="butn" onclick='detail("${url}","${doc.data().name}" , "${doc.data().price}")'>Add to Bag</button>

                </div>
                `
                    // window.location.href="./index.html"
                })
                .catch((error) => {
                    console.log("Error -->", error)
                });
        })

    })
function detail(url, name, price) {
    var detail = {
        Image: url,
        Title: name,
        Price: price,
        Quantity: "1",
    }

    localStorage.setItem("Detail", JSON.stringify(detail))
    window.location.href = './Detail.html'
}
window.detail = detail
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, query, onSnapshot} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
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
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
window.add = async () => {
    try {
        const docRef = await addDoc(collection(db, "prodcuts"), {
            name: document.getElementById("name").value,
            price: document.getElementById("price").value,
            description: document.getElementById("desc").value,
        });
        const storageRef = ref(storage, `${document.getElementById("price").value}${document.getElementById("name").value}${document.getElementById("desc").value}`);
        var file = document.getElementById("image").files[0]
        uploadBytes(storageRef, file).then((snapshot) => {
            window.location.href = "./index1.html"
        });

        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }


}





        // data showing

        // console.log("adkjahsj");
        // const getdata = async () => {
        const q = query(collection(db, "Admin"));
        onSnapshot(q, (onSnapshot) => {
            onSnapshot.forEach((doc) => {
                // Get products collection data
                console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);

                // For Showing Card
                let total = doc.data().Price * doc.data().Quantity;
                console.log(total);
                document.getElementById("adminshow").innerHTML += `
            <img alt="Image" src="${doc.data().Pic}" id="imgs">
            <p>Title: ${doc.data().Title} </p>
            <p>Price: $${doc.data().Price}</p>
            <p>Quantity: ${doc.data().Quantity}</p>
            <p>Total: ${total}</p>`
                // window.location.href="./index.html"
            })
        })





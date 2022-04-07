// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { async } from "@firebase/util";
import { collection, getDocs, setDoc, deleteDoc, getFirestore, doc } from 'firebase/firestore';
import { uuid } from 'uuidv4';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export function firebaseConfig() {

  const config = {
    apiKey: "AIzaSyCbSoVuszal5FOg1y2ISOS-WJU5COOuA1I",
    authDomain: "scarvalo-708d7.firebaseapp.com",
    projectId: "scarvalo-708d7",
    storageBucket: "scarvalo-708d7.appspot.com",
    messagingSenderId: "848188349891",
    appId: "1:848188349891:web:b41f8fa6284d218cb1b176",
    measurementId: "G-0Q521BBSR0"
  };

  // Initialize Firebase
  const app = initializeApp(config);
  const analytics = getAnalytics(app);
}

export function firebaseRegistrarUsuario(email, password) {
  createUserWithEmailAndPassword(getAuth(), email, password)
    .then(credenciales => {
      //credenciales.user
    });

}

export async function firebaseIniciarSesion(email, password) {
  try {
    let credenciales = await signInWithEmailAndPassword(getAuth(), email, password);
    //credenciales.user
  }
  catch(e) {
    return false;
  } 
  return true;
}

export async function firebaseBuscar(coleccionABuscar) {
  let listado = [];
  let consulta = collection(getFirestore(), coleccionABuscar);
  let resultado = await getDocs(consulta);
  resultado.forEach((documento) => {
    let objeto = documento.data();
    objeto.id = documento.id;
    listado.push(objeto);
  });
  return listado;
}

export function firebaseCrear(coleccion, objeto) {
  objeto.id = uuid();
  let referencia = doc(getFirestore(), coleccion, objeto.id);
  setDoc(referencia, objeto)
}

export async function firebaseEliminar(coleccion, id) {
  await deleteDoc(doc(getFirestore(), coleccion, id));
}

import './App.css';
import {initializeApp} from "firebase/app"
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc,doc, getDocs
} from "firebase/firestore"

import { useEffect, useState, useRef } from 'react';

function App() {
  let books = useRef("")
  let db = useRef("")
  let colRef = useRef("")

  useEffect(() => {
  const firebaseConfig = {
    apiKey: "AIzaSyD1rk8K_TKnAnx9YWUFEoQ_OJUuF666tlk",
    authDomain: "fir-6012c.firebaseapp.com",
    projectId: "fir-6012c",
    storageBucket: "fir-6012c.appspot.com",
    messagingSenderId: "616204259684",
    appId: "1:616204259684:web:7705eb62965e69a0d7aa71"
  };
  initializeApp(firebaseConfig)
  db.current = getFirestore()
   colRef.current = collection(db.current, "books")
  onSnapshot(colRef.current, (snapshot) => {
     books.current = snapshot.docs.map((doc) => {
      return {...doc.data(), id:doc.id}
    })

    console.log(books)
  })


},[])

  const [name, changeName] = useState("")
  const [author,changeAuthor] = useState("")
  const [id,changeId] = useState("")

  const addDocument = (e) => {
    e.preventDefault()

    addDoc(colRef.current,{
      title: name,
      author
    } )
    .then(() => {
      changeName("")
      changeAuthor("")
    })
  }

  const deleteDocument = (e) => {
    e.preventDefault()

    const docRef = doc(db.current, "books", id)
    deleteDoc(docRef).then(() => {
      changeId("")
      console.log("Great Success")
    }).catch(e => console.log(e))
  }

  return (
    <div className="App">
      <h1>Firebase</h1>

      <form onSubmit={(e) => addDocument(e)}>
        <h2> Add a new document </h2>
        <label>What is the author name?</label>
        <input type="text" value={author} onChange = {(e) => changeAuthor(e.target.value)}/>

        <label>What is the book name?</label>
        <input type="text" value={name} onChange = {(e) => changeName(e.target.value)}/>
        <button type='submit'>Add a new doc</button>
      </form>

      
      <hr />
      <h2>Delete a document</h2>
      <form onSubmit={(e) => deleteDocument(e)}>
        <label> What is the ID?</label>
        <input type="text"  value = {id} onChange = {(e) => changeId(e.target.value) }/>
        </form> 
        <button type='submit' onClick={deleteDocument}>Delete</button>
    </div>
  );
}

export default App;

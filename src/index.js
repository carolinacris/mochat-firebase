
import './styles/main.scss';
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDGe98FFpK0TRHFJu3ldiE_wRsrn9GKdKU",
    authDomain: "mochat-carolina.firebaseapp.com",
    projectId: "mochat-carolina",
    storageBucket: "mochat-carolina.appspot.com",
    messagingSenderId: "998352307045",
    appId: "1:998352307045:web:fbdde07414eb31f0a2578c"
  };

  
document.addEventListener('DOMContentLoaded',()=>{
      // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    //collegarlo al database
    const db=firebase.firestore();

    //collegarlo alla raccolta proprio
    const collection=db.collection('chat');
    //seleziono l'ul perche dobbiamo renderizzare degli elementi al suo interno
    const ul=document.querySelector('ul');
 
    const form = document.querySelector ('form');

    //prendo i dati e avviso quando cambiano, quindi quando ci metto dentro una funzione lui la ripete per ogni volta che i dati vengono cambiati, e lo fa indipendentemente dal client, la sista si aggiorna in tempo reale da una delle due tab. dietro le quinte utilizza un mix di fetch eweb sochet
    collection.orderBy('timestamp').onSnapshot((snapshot)=> { //prendi la collection.ordinala per tempo.
        console.log(snapshot.docs); //conterrà oggetto js con informazioni asincrone. è una foto i quello che è succeso nel momento che la funzione mi ha mandato i dati compreso anche i dati stessi, simile all'oggetto eventi con l'event listener
        const json=snapshot.docs.map(doc => {
            //per ogni elmento che stiamo mappando esegui quesa funaizone
            return {id: doc.id, ...doc.data()} //mi cambia la struttura che è il lavoro del map id:doc.id vuol dire vai aleggere l'id, mentre invece ...doc.data prende un oggetto e lo scompone nell singole chiavi, prende il contentuto dell'oggetto e mi crea tre variabili, una text una user, e una timestamp, una variabile per ogni chiave che c'è dentro l'oggetto, ma io lho messo dentro un nuovo oggetto che sto creando.
            //te lo porto fuori in una nuova variabile, li porta su di un livello.
        }); //è simile al for eache ma mi permette rdimappare la struttra di un array,
        const elements = json.map(doc => `<li><b>${doc.user}:</b> ${doc.text}</li>`); //rifai la struttura con un li
        ul.innerHTML= elements.join(''); //prendi tutte le stringe dentro l'array e le agganci in un unica stringa, se ci fossero tanti messaggi sarebbero in diversi li, join incatenerebbe, ma sono scrighe quindi le mette insieme

    });

    form.addEventListener('submit', (event)=> {
        event.preventDefault(); //vuol dire non fare il comportamento standard della form
        const obj= {
            //definire il nuovo oggetto
            timestamp: new Date().toISOString(),  //giorno e ora scritti in una dato forma, salva l'ora del meridiano e poi aggiunge quello della tua zona
            user: document.querySelector('#username').value, //per vedere a fare sempre una nuova quesry nel documento
            text: event.target.new.value //event targhet va a prendre la form perchè l'evento noi lo abiammo messo sulla form
        }
        collection.doc().set(obj); //set 2gli passo n valore, prende questi dati fa un nuovo oggetto e li inserisce nella collection
        event.target.reset(); //per far tornare la form vuota
    });
});
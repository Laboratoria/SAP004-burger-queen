import React, { useState, useEffect } from 'react';
import './kitchen.css';
import '../../reset.css';
import firebase from '../../config/firebase';
import { Link } from 'react-router-dom';
import { history } from '../../history';
import 'firebase/firestore';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { useSelector, useDispatch } from 'react-redux';



const Kitchen = () => {

	const [allRequestsToMake, setAllRequestsToMake] = useState([]);
	let requestsToMake = [];

	const firebaseRequisition = (collectionP, arrayP, setP) =>{
        firebase
          .firestore()
          .collection(collectionP)
          .orderBy("hourSend", "desc")
          .get()
          .then(async (result) => {
            await result
              .docs
              .forEach(doc => arrayP
                .push({
                  id: doc.id,
                  ...doc.data()
                })
              )
              setP(arrayP);
          })
      }

	useEffect(() => {
		firebaseRequisition("orders-shipped", requestsToMake, setAllRequestsToMake);
    }, []);
    
    const sendReadyOrders = (item) => {
        console.log(allRequestsToMake)
        firebase.firestore().collection("orders-shipped").doc(item.id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ");
        });
        

        firebase.firestore().collection("order-history").doc().set({
            uid: item.uid,
            attendantName: item.attendantName,
            clientName: item.clientName,
            tableNumber: item.tableNumber,
            requests: item.requests,
            hourSend: item.hourSend,
            hourReady: Date.now(),
            timeDifference: Date.now() - item.hourSend

        }).then(function() {
            console.log("Document successfully written!");
        }).catch(function(error) {
            console.error("Error writing document: ", error);
        });

        firebase.firestore().collection("ready-orders").doc().set({
            uid: item.uid,
            attendantName: item.attendantName,
            clientName: item.clientName,
            tableNumber: item.tableNumber,
            requests: item.requests,
            hourSend: item.hourSend,
            hourReady: Date.now(),
            timeDifference: Date.now() - item.hourSend

        }).then(function() {
            console.log("Document successfully written!");
        }).catch(function(error) {
            console.error("Error writing document: ", error);
        });

        setAllRequestsToMake(allRequestsToMake.filter((removeItem) => removeItem.id != item.id))
    }

    console.log(useSelector(state => state.userLogged))
    console.log(useSelector(state => state.userEmail))
    console.log(useSelector(state => state.userLocal))

    return(
        <div>
                
            <Header
                name1='Em Andamento'
            	name2='Histórico de Pedidos'

                butClick1={() => history.push('/kitchen')}
                butClick2={() => history.push('/historic')}
            />
            <h1 className="for-title">Pedidos em Andamento</h1>

            <div className="container">

                {
                    allRequestsToMake.map(item =>

                        <Card client={item.clientName} tableNumber={item.tableNumber} worker={item.attendantName} viewRequests={item.requests} sendClick={() =>{sendReadyOrders(item)}} buttonTitle='PRONTO PARA SERVIR' />
                                            
                    )
                }

                {
                    allRequestsToMake.map(item =>{
                        console.log(item.tableNumber)
                    })
                }
            
            </div>
                
        </div>
    )

}

export default Kitchen;
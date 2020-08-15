import React, { useState, useEffect } from 'react';
import '../kitchen/kitchen.css';
import '../../reset.css';
import firebase from '../../config/firebase';
import { Link } from 'react-router-dom';
import { history } from '../../history';
import 'firebase/firestore';
import Header from '../../components/Header';
import Card from '../../components/Card';


const Historic = () => {

    const [allOldOrders, setAllOldOrders] = useState([]);
    let allOldOrdersArray = [];

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
		firebaseRequisition("order-history", allOldOrdersArray, setAllOldOrders);
    }, []);

    const deleteOrder = (item) =>{

        firebase.firestore().collection("order-history").doc(item.id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ");
        });

        setAllOldOrders(allOldOrders.filter((removeItem) => removeItem.id != item.id))
    }

    const msForMin = (msPar) =>{
        return Math.round(msPar/60000)
    }

    return(

        <div>
            
                <Header
                    name1='Em Andamento'
                    name2='Histórico de Pedidos'

                    butClick1={() => history.push('/kitchen')}
                	butClick2={() => history.push('/historic')}
                />
                <h1 className="for-title">Histórico de Pedidos</h1>


                <div className="container">

                    {
                        allOldOrders.map(item =>

                            <Card client={item.clientName} tableNumber={item.tableNumber} worker={item.attendantName} viewRequests={item.requests} time={ "Tempo de Preparo: " + msForMin(item.timeDifference) + " min"} sendClick={() =>{deleteOrder(item)}} buttonTitle='DELETAR PEDIDO' />
                                                
                        )
                    }

                </div>
        </div>

    )


}

export default Historic;
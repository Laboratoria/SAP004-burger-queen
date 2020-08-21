import firebase from '../../config/firebase';
import 'firebase/auth';
import 'firebase/firestore';
import { history } from '../../history';



const LogOut = () => {
        dispatch({ type: 'LOG_OUT' })  

        firebase
            .auth()
            .signOut()
            .then(() => {
                history.push('/login')
            })
    
};

export default LogOut;


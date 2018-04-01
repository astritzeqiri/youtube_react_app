import Firebase from 'firebase'
import firebaseConfig from '../config/firebase_config'
Firebase.initializeApp(firebaseConfig)

export default Firebase
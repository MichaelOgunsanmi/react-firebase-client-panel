import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import firebase from 'firebase/app'
import  'firebase/auth'
import 'firebase/firestore'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'

import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";


const firebaseConfig = {
    apiKey: "AIzaSyDRsB03cPeNf_RQJYAAtr8RNt43MxnBByI",
    authDomain: "reactfirebaseclientpanel.firebaseapp.com",
    databaseURL: "https://reactfirebaseclientpanel.firebaseio.com",
    projectId: "reactfirebaseclientpanel",
    storageBucket: "reactfirebaseclientpanel.appspot.com",
    messagingSenderId: "1021046031702",
    appId: "1:1021046031702:web:c8c0b4892a49065a"
}

const rrfConfig = {
    userProfile: 'users', 
    useFirestoreForProfile: true
}


firebase.initializeApp(firebaseConfig)

// const firestore = firebase.firestore()
// const settings = { timestampsInSnapshots: true }
// firestore.settings(settings)

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore)

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notify: notifyReducer,
    settings: settingsReducer
})

//Check for settings in local storage
if (localStorage.getItem('settings') === null) {
    
    const defaultSetting = {
        disableBalanceOnAdd: true,
        disableBalanceOnEdit: false,
        allowRegistration: false
    }

    localStorage.setItem('settings', JSON.stringify(defaultSetting))
}

const initialState = { settings: JSON.parse(localStorage.getItem('settings')) }

// const store = createStoreWithFirebase(rootReducer, initialState, compose(reactReduxFirebase(firebase), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

const store = createStoreWithFirebase(rootReducer, initialState, reactReduxFirebase(firebase))

export default store
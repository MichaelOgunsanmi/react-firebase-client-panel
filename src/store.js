import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import firebase from 'firebase/app'
import  'firebase/auth'
import 'firebase/firestore'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'

import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";


const firebaseConfig = {
    apiKey: "AIzaSyCX6Re2OcGaO5MjKKzrvwfo2V3kY5B4bLE",
    authDomain: "react-based-client-panel.firebaseapp.com",
    databaseURL: "https://react-based-client-panel.firebaseio.com",
    projectId: "react-based-client-panel",
    storageBucket: "react-based-client-panel.appspot.com",
    messagingSenderId: "1097948652154",
    appId: "1:1097948652154:web:2505fa4499413715"
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
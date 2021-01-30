/* 
    grouping pages components for export
*/

export { default as Home } from './Home/Home'

export { default as Kennel } from './Kennel/Kennel'
export {default as Dog} from './Kennel/Dog'

export { default as Dates } from './Date/Date'

export { default as Event } from './Event/Event'
export { default as EventDetails } from './Event/Components/EventDetails'
export { default as EventCreate } from './Event/Components/CreateEvent'
export { default as EventUpdate } from './Event/Components/UpdateEvent'

// Accounts
export { default as Register } from './Register/RegisterContainer'
export { default as Login } from './Login/LoginContainer'
export { default as AccountMan } from './AccountMan/AccountMan'

// Dog management
export { default as DogMan } from './DogMan/DogMan'
export { default as CreateDog } from './DogMan/CreateDog'
export { default as UpdateDog } from './DogMan/UpdateDog'

// admin
export {default as AdminUserList} from './AdminHome/UserMan/UserMan'
export {default as AdminUserUpdate} from './AdminHome/UserMan/Components/UserPage'

export { default as AdminLocMan } from './AdminHome/LocMan/LocMan'
export { default as AdminLocCreate } from './AdminHome/LocMan/CreateLocation'
export { default as AdminLocUpdate } from './AdminHome/LocMan/UpdateLocation'

export { default as AdminMsg } from './AdminHome/Mesg/Mesg'
export { default as NewMsg } from './Comms/NewInquiry'
export { default as UserMsg } from './Comms/UserInquiries'


export { default as NotFound } from './NotFound/NotFound'

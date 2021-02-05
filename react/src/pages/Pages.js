/* 
    grouping pages components for export
*/

export { default as Home } from './home/Home'
export { default as Kennel } from './kennel/KennelContainer'
export {default as Dog} from './viewDog/ViewDog'

export { default as Dates } from './date/Date'

export { default as Event } from './event/Event'
export { default as EventDetails } from './event/Components/EventDetails'
export { default as EventCreate } from './event/Components/CreateEvent'
export { default as EventUpdate } from './event/Components/UpdateEvent'

// Accounts
export { default as Register } from './register/RegisterContainer'
export { default as Login } from './login/LoginContainer'
export { default as AccountMan } from './accountManagement/AccountManContainer'

// Dog management
export { default as DogMan } from './dogManagement/DogMan'
export { default as CreateDog } from './dogManagement/CreateDog'
export { default as UpdateDog } from './dogManagement/UpdateDog'

// admin
export {default as AdminUserList} from './adminHome/UserMan/UserMan'
export {default as AdminUserUpdate} from './adminHome/UserMan/Components/UserPage'

export { default as AdminLocMan } from './adminHome/LocMan/LocMan'
export { default as AdminLocCreate } from './adminHome/LocMan/CreateLocation'
export { default as AdminLocUpdate } from './adminHome/LocMan/UpdateLocation'

export { default as AdminMsg } from './adminHome/Mesg/Mesg'
export { default as NewMsg } from './Comms/NewInquiry'
export { default as UserMsg } from './Comms/UserInquiries'

export { default as NotFound } from './notFound/NotFound'

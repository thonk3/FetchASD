import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../kennel/kennel.css';
import token from '../../utils/tokenUtils';

import DateRequest from './DateRequest';

import NotFound from '../notFound/NotFound'

const ViewDogContainer = (props) => {
    const [dogProfile, setDogProfile] = useState({
        id: props.match.params.id,
        name: "",
        age: 0,
        breed: "",
        suburb: "",
        gender: "",
        bio: "",
        imgUrl: "",
        rating: 0,
    });
    // date request
    // date dialoge data
    const [myDogs, setMyDogs] = useState([]);
    const [locationsList, setLocationsList] = useState([]);
    // miscs
    const [wrongPage, setWrongPage] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // set up profile on start
    const loadDogProfile = () => {
        ;
    }

    // get current user dog list to set date request
    const getMyDogs = () => {
        axios.get(`/api/users/${token.getToken()}/dogs`) // get all dogs from user
            .then(res => setMyDogs([...res.data]))
            .catch((error) => console.log("loading dog list err.", error));
    }

    // get location list to set date request
    const getLocationList = () => {
        console.log("hello");
        axios.get('/api/locations/')
            .then(res => {
                setLocationsList([...res.data]);
                setIsLoading(false);
                setFilteredLocation([...res.data]);
            })
            .catch((error) => console.log("loading locations err", error));
    }

    // load api on mount
    useEffect(() => {
        axios.get(`/api/dogs/${dogProfile.id}`)
            .then(res => {
                setDogProfile({
                    ...dogProfile,
                    name: res.data.Name,
                    age: res.data.Age,
                    breed: res.data.Breed,
                    suburb: res.data.Suburb,
                    gender: res.data.Gender,
                    bio: res.data.Bio,
                    imgUrl: res.data.imageUrl,
                    rating: res.data.Score || 0,
                });
                setIsLoading(false);
            })  
            .catch(err => setWrongPage(true));

        // getMyDogs();        // move to request
        // getLocationList();  // move into request
    }, []);

    // --------------------------------------------------------------------------------



    // wtf is this
    const [locationAddr, setLocationAddr] = useState("");



    // filter location
    const [filterTerm, setFilterTerm] = useState("");
    const [filteredLocation, setFilteredLocation] = useState([...locationsList]);
    const filterTaste = (val) => val.toLowerCase().includes(filterTerm.toLowerCase());
    const filterLocations = (e) => {
        setFilterTerm(e.target.value);
        setFilteredLocation(
            locationsList.filter(loc => filterTaste(loc.Address) || filterTaste(loc.Name))
        )
    }

    // --------------------------------------------------------------------------------
    // for incorrect id
    if (wrongPage) return <NotFound />


    return (
        <div className="contain-within">
            <div className="float-left">
                <div> <img src={dogProfile.imgUrl} alt="Dog" className="imgplaceholder" /> </div>
                <DateRequest
                    myDogs={myDogs}
                    filterTerm={filterTerm}
                    filterLocations={filterLocations}
                    filteredLocation={filteredLocation}
                />

            </div>
            <div>
                <h1>{dogProfile.name}, {dogProfile.age}</h1>
                <h3> Breed: {dogProfile.breed} </h3>
                <h3> Suburb: {dogProfile.suburb} </h3>
                <h3> Gender: {dogProfile.gender} </h3>
                <h3> Rating: {dogProfile.rating} </h3>
                <h3> Bio: {dogProfile.bio} </h3>
            </div>
        </div>
    );
}


export default ViewDogContainer;
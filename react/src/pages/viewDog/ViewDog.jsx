import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../kennel/kennel.css';

import DateRequest from './DateRequest';

import NotFound from '../notFound/NotFound'
import Spinner from '../../components/spinner/Spinner';

const ViewDog = (props) => {
    
    const id = props.match.params.id;
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [breed, setBreed] = useState("");
    const [suburb, setSuburb] = useState("");
    const [gender, setGender] = useState("");
    const [bio, setBio] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [rating, setRating] = useState(0);

    // miscs
    const [wrongPage, setWrongPage] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // set up profile on start
    useEffect(() => {
        axios.get(`/api/dogs/${id}`)
            .then(res => {
                setName(res.data.Name);
                setAge(res.data.Age);
                setBreed(res.data.Breed);
                setSuburb(res.data.Suburb);
                setGender(res.data.Gender);
                setBio(res.data.Bio);
                setImgUrl(res.data.imageUrl);
                setRating(res.data.Score || 0);

                setIsLoading(false);
            })
            .catch(err => setWrongPage(true));
    }, [id]);


    // --------------------------------------------------------------------------------
    if (wrongPage) return <NotFound />
    if (isLoading) return <Spinner />

    return (
        <div className="contain-within">
            <div className="float-left">
                <div> <img src={imgUrl} alt="Dog" className="imgplaceholder" /> </div>
                <DateRequest receiverID={id} />

            </div>
            <div>
                <h1>{name}, {age}</h1>
                <h3> Breed: {breed} </h3>
                <h3> Suburb: {suburb} </h3>
                <h3> Gender: {gender} </h3>
                <h3> Rating: {rating} </h3>
                <h3> Bio: {bio} </h3>
            </div>
        </div>
    );
}


export default ViewDog;
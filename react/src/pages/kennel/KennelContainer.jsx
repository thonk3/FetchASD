import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Kennel from './Kennel';

/* 
    Logic operations wrapper for Kennel Component
*/

const KennelContainer = props => {
    const [filterText, setFilterText] = useState('');
    const [dogListDefault, setDogListDefault] = useState();
    const [dogList, setDogList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/dogs')  // get dog list on load
            .then(res => {
                setDogList(res.data);
                setDogListDefault(res.data);
                setLoading(false);
            })
    }, []);

    const onFilterChange = (e) => {
        // set inputState
        setFilterText(e.target.value);
        // filter new list
        const filtered = dogListDefault.filter(dog =>
            dog.Suburb.toLowerCase().includes(filterText.toLowerCase()));
        // update rendered dog list
        setDogList(filtered);
    }

    // pass in
    // filterText, onFilterChange
    // dogList, loading
    return <Kennel
        filterText={filterText}
        onFilterChange={onFilterChange}
        loading={loading}
        dogList={dogList} />
}

KennelContainer.propTypes = {

}

export default KennelContainer

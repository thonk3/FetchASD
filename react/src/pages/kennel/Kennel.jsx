import React from 'react';
import PropTypes from 'prop-types';

import KennelList from './KennelList';
import Spinner from '../../components/spinner/Spinner'
import { Container, TextField, Typography } from '@material-ui/core';

const Kennel = (props) => {
  const { filterText, onFilterChange, dogList, loading } = props;

  const loadingData = () => {
    if(loading) return <Spinner />
    else return <div className="flex-container"><KennelList dogList={dogList} /></div>
  }

  return (
    <>
      <Typography variant="h4" align="center">
        Search for a friend...
      </Typography>

      <Container maxWidth="md">
        <TextField
          fullWidth
          placeholder="Enter your suburb here..."
          variant="outlined"
          value={filterText}
          onChange={onFilterChange} />


      </Container>

      {loadingData()}
    </>
  );
}

Kennel.propTypes = {
  filterText: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  dogList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default Kennel







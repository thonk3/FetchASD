import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import axios from "axios";
import { Grid } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import coolDogImage from '../../assets/cool.jpg';

const styles =
{
    media: {
        height: "150px",
        // paddingTop: '56.25%', // 16:9,
        marginTop: '5'
    }
};


class DogMan extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeBreed = this.onChangeBreed.bind(this);
        this.onChangeSuburb = this.onChangeSuburb.bind(this);
        this.onChangePostcode = this.onChangePostcode.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeIsVaccinated = this.onChangeIsVaccinated.bind(this);
        this.onChangeIsDesexed = this.onChangeIsDesexed.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            dogs: [],
            userEmail: 'rbabcock0@dyndns.org',
            Name: '',
            Age: '',
            Breed: '',
            Suburb: '',
            Postcode: '',
            Gender: '',
            isVaccinated: '',
            isDesexed: '',
            Bio: ''
        };
    }

    // Special function that runs on reload
    componentDidMount() {
        axios.get('http://localhost:5000/api/users/5f57036e927d194baceedf7a/dogs')
            .then(res => {
                this.setState({
                    dogs: res.data,
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeName(e) {
        this.setState({
            Name: e.target.value
        })
    }

    onChangeAge(e) {
        this.setState({
            Age: e.target.value
        })
    }

    onChangeBreed(e) {
        this.setState({
            Breed: e.target.value
        })
    }

    onChangeSuburb(e) {
        this.setState({
            Suburb: e.target.value
        })
    }

    onChangePostcode(e) {
        this.setState({
            Postcode: e.target.value
        })
    }

    onChangeGender(e) {
        this.setState({
            Gender: e.target.value
        })
    }

    onChangeIsVaccinated(e) {
        this.setState({
            isVaccinated: e.target.value
        })
    }

    onChangeIsDesexed(e) {
        this.setState({
            isDesexed: e.target.value
        })
    }

    onChangeBio(e) {
        this.setState({
            Bio: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const newDog = {
            "userEmail": this.state.userEmail,
            "Name": this.state.Name,
            "Age": this.state.Age,
            "Breed": this.state.Breed,
            "Suburb": this.state.Suburb,
            "Postcode": this.state.Postcode,
            "Gender": this.state.Gender,
            "isVaccinated": this.state.isVaccinated,
            "isDesexed": this.state.isDesexed,
            "Bio": this.state.Bio
        }


        console.log(newDog);

        axios.post('http://localhost:5000/api/canines/add', newDog)
            .then(res => {
                console.log(res.data)
                // Adds the new dog object to the table
                this.setState({
                    dogs: [
                        ...this.state.dogs,
                        newDog
                    ]
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }


    render() {
        return (
            <div className="dog-management">
                <h1>Dog Management</h1>
                <h2>Create New Dog</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label> Age: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Age}
                            onChange={this.onChangeAge}
                        />
                    </div>
                    <div className="form-group">
                        <label> Breed: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Breed}
                            onChange={this.onChangeBreed}
                        />
                    </div>
                    <div className="form-group">
                        <label> Suburb: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Suburb}
                            onChange={this.onChangeSuburb}
                        />
                    </div>
                    <div className="form-group">
                        <label> Postcode: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Postcode}
                            onChange={this.onChangePostcode}
                        />
                    </div>
                    <div className="form-group">
                        <label> Gender: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Gender}
                            onChange={this.onChangeGender}
                        />
                    </div>
                    <div className="form-group">
                        <label> Vaccinated: </label>
                        <input type="text"

                            className="form-control"
                            value={this.state.isVaccinated}
                            onChange={this.onChangeIsVaccinated}
                        />
                    </div>
                    <div className="form-group">
                        <label> Desexed: </label>
                        <input type="text"

                            className="form-control"
                            value={this.state.isDesexed}
                            onChange={this.onChangeIsDesexed}
                        />
                    </div>

                    <div className="form-group">
                        <label> Bio: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Bio}
                            onChange={this.onChangeBio}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Dog" />
                    </div>
                </form>
                <h2>Your Dogs</h2>
                <Grid container spacing={2} style={{ marginLeft: 5 }}>
                    {this.state.dogs.map(dog => <DataTable obj={dog} />)}
                </Grid>
            </div >
        );
    }
}

class DataTable extends Component {
    render() {
        return (
            <div style={{ marginTop: 5, padding: 5 }}>
                <Grid>
                    <Card class="dog" style={{ padding: 5, height: 400 }}>
                        <CardContent>
                            <CardMedia component="img" alt="cool dog img" image={coolDogImage} title="Cool Dog" style={styles.media} />
                            <h3>{this.props.obj.Name}, {this.props.obj.Age}</h3>
                            <p>{this.props.obj.Breed}</p>
                            <p>{this.props.obj.Suburb}, {this.props.obj.Postcode}</p>
                            <Button variant="contained" color="primary">Edit Dog </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
        );
    }
}

export default DogMan;
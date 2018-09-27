import React, { Component } from 'react';
import fetch from 'isomorphic-fetch'
import LinkDetails from './LinkDetails.js'


class Links extends Component {

	constructor(props) {
		super(props); 

		this.state = {
			dat: ''
		}
	}

  	componentDidMount() {
  		
  		const api_key = process.env.REACT_APP_API_KEY
  		const dat = []
  		
  		fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${api_key}`) 
  			.then(res => 
  				res.json()
  			)
  		.then(arts => {  			
  			const dat= arts.results
			this.setState({
				dat: arts.results
			})
  		})  		
  	}

  	

	render() {	
		
		return (
			<div className="App">
        		<LinkDetails test={this.state.dat} />
		    </div>
    	);
  	}
}

export default Links;

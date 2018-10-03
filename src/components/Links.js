import React, { Component } from 'react';
import fetch from 'isomorphic-fetch'
import LinkDetails from './LinkDetails.js'


class Links extends Component {

	constructor(props) {
		super(props); 

		this.state = {
			dat: '', 
      mostViewed: '',       
      displayValue: 'none'
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
				dat: arts.results, 
         pageTitle: 'Top Stories'
			})
  		})  

  	}

 
  	

	render() {	
		
		return (
			<div>         
            <LinkDetails test={this.state.dat} mostViewed={this.state.mostViewed} pageTitle={this.state.pageTitle}/>
		  </div>
    	);
  	}
}

export default Links;

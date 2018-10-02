import React, { Component } from 'react';
import fetch from 'isomorphic-fetch'
import LinkDetails from './LinkDetails.js'


class Links extends Component {

	constructor(props) {
		super(props); 

		this.state = {
			dat: '', 
      mostViewed: ''
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

      fetch(`https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?api-key=${api_key}`) 
        .then(res => 
          res.json()
        )
      .then(mv => {       
        console.log('mv', mv)
        const mostViewed= mv.results
      this.setState({
        mostViewed: mv.results
      })
      })  		
  	}

  	

	render() {	
		
		return (
			<div className="App">
        		<LinkDetails test={this.state.dat} mostViewed={this.state.mostViewed}/>
		    </div>
    	);
  	}
}

export default Links;

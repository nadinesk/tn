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

     this.handleTSClick = this.handleTSClick.bind(this)
     this.handleMVClick = this.handleMVClick.bind(this)
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

    handleTSClick = event => {
     
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
        pageTitle: 'Top Stories',     
        displayValue: 'none'
      })
      })  
    }

    handleMVClick = event => {
       
      const api_key = process.env.REACT_APP_API_KEY
      const dat = []
      
      fetch(`https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?api-key=${api_key}`) 
        .then(res => 
          res.json()
        )
      .then(arts => {       
        console.log('mv', arts)
        const dat= arts.results
      this.setState({
        dat: arts.results,
        pageTitle: 'Most Viewed',
        displayValue: 'block'
      })
      })    
    }
  	

	render() {	
		
		return (
			<div> 
        		<div onClick={this.handleTSClick}> Top Stories </div>
            <div onClick={this.handleMVClick}> Most Viewed </div>
            <div style={{display: this.state.displayValue}}> asdf</div>
            <LinkDetails test={this.state.dat} mostViewed={this.state.mostViewed} pageTitle={this.state.pageTitle}/>
		  </div>
    	);
  	}
}

export default Links;

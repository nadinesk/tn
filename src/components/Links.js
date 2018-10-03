import React, { Component } from 'react';
import fetch from 'isomorphic-fetch'
import LinkDetails from './LinkDetails.js'


class Links extends Component {

	constructor(props) {
		super(props); 

		this.state = {
			dat: '', 
      mostViewed: '',       
      displayValue: 'none', 
      articleType: 'Top Stories', 
      sectionType: 'home'
		}

     this.handleClick = this.handleClick.bind(this)
     
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

    handleClick = event => {
      const api_key = process.env.REACT_APP_API_KEY
      const dat = []
      this.setState({
        articleType: event.target.innerText
      })

      if (event.target.innerText == 'Top Stories') {
          fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${api_key}`) 
          .then(res => 
            res.json()
          )
        .then(arts => {       
          const dat= arts.results
        this.setState({
           dat: arts.results, 
           pageTitle: 'Top Stories', 
           sectionType: 'home'
        })
        })  
      } else if (event.target.innerText == 'Most Viewed') {          
          fetch(`https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?api-key=${api_key}`) 
          .then(res => 
            res.json()
          )
        .then(arts => {       
          const dat= arts.results
        this.setState({
           dat: arts.results, 
           pageTitle: 'Top Stories', 
           sectionType:'all-sections'
        })
        })  
      }
    }



 
  	

	render() {	
    		
		return (
			<div>         
            <div onClick={this.handleClick}>Top Stories</div>             
            <div onClick={this.handleClick}>Most Viewed</div>             
            <LinkDetails articleType={this.state.articleType} sectionType={this.state.sectionType} test={this.state.dat} mostViewed={this.state.mostViewed} pageTitle={this.state.pageTitle}/>
		  </div>
    	);
  	}
}

export default Links;

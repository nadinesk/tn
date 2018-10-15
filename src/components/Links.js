import React, { Component } from 'react';
import fetch from 'isomorphic-fetch'
import LinkDetails from './LinkDetails.js'
import { Grid, Row, Col, Navbar, Nav, NavItem} from 'react-bootstrap';


class Links extends Component {

	constructor(props) {
		super(props); 

		this.state = {
			dat: '', 
      mostViewed: '',       
      displayValue: 'none', 
      articleType: 'Top Stories', 
      sectionType: 'section', 
      currentType: 'topStories', 
      mv: '', 
      msh: '', 
      mem: ''
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

      fetch(`https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?api-key=${api_key}`) 
        .then(res => 
          res.json()
        )
      .then(arts => {              
        this.setState({
          mv: arts.results[0],          
        })
      })  


      fetch(`https://api.nytimes.com/svc/mostpopular/v2/mostshared/all-sections/1.json?api-key=${api_key}`) 
        .then(res => 
          res.json()
        )
      .then(arts => {              
        this.setState({
          msh: arts.results[0],          
        })
      })  

      fetch(`https://api.nytimes.com/svc/mostpopular/v2/mostemailed/all-sections/1.json?api-key=${api_key}`) 
        .then(res => 
          res.json()
        )
      .then(arts => {              
        
        this.setState({
          mem: arts.results[0],          
        })
      })  

  	}

    handleClick = event => {
      
      const api_key = process.env.REACT_APP_API_KEY
      const dat = []

      const textClick = event.target.innerText 

      this.setState({
        articleType: textClick
      })

      if (textClick == 'Top Stories' || textClick == 'NewsKong' ) {
          fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${api_key}`) 
          .then(res => 
            res.json()
          )
        .then(arts => {       
          const dat= arts.results
        this.setState({
           dat: arts.results, 
           pageTitle: 'Top Stories', 
           sectionType: 'home', 
           currentType: 'topStories'
          
        })
        })  
      } else if (textClick  == 'Most Viewed') {          
          fetch(`https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?api-key=${api_key}`) 
          .then(res => 
            res.json()
          )
        .then(arts => {       
          const dat= arts.results
        this.setState({
           dat: arts.results, 
           pageTitle: 'Most Viewed', 
           sectionType:'all-sections', 
           currentType: 'mostViewed'
        })
        })  
      } else if (textClick  == 'Most Shared') {          
          fetch(`https://api.nytimes.com/svc/mostpopular/v2/mostshared/all-sections/1.json?api-key=${api_key}`) 
          .then(res => 
            res.json()
          )
        .then(arts => {       
          const dat= arts.results
        this.setState({
           dat: arts.results, 
           pageTitle: 'Most Shared', 
           sectionType:'all-sections', 
           currentType: 'mostShared'
        })
        })  
      }
       else if (textClick  == 'Most Emailed') {          
          fetch(`https://api.nytimes.com/svc/mostpopular/v2/mostemailed/all-sections/1.json?api-key=${api_key}`) 
          .then(res => 
            res.json()
          )
        .then(arts => {       
          const dat= arts.results
        this.setState({
           dat: arts.results, 
           pageTitle: 'Most Emailed', 
           sectionType:'all-sections', 
           currentType: 'mostEmailed'
        })
        })  
      }
    }



 
  	

	render() {	
    		
		return (		
        <div> 
          <Row>               
              <Navbar>
              <Row> 
                  <Col style={{textAlign: 'left', color: "#A9A9A9", marginTop: 5, marginBottom: 0}} md={12}>The New York Times' Top and Most Popular Stories</Col>
                  
                </Row>
                
              <Row>
               <Col md={3}></Col>
                <Col xs={12} md={6}>  
                <Navbar.Header>
                  <Navbar.Brand>
                    <a  href="#">NewsKong</a>
                  </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                  <NavItem eventKey={1} onClick={this.handleClick} >
                    Top Stories
                  </NavItem>
                  <NavItem  eventKey={2} onClick={this.handleClick} >
                    Most Viewed
                  </NavItem>     
                  <NavItem  eventKey={3} onClick={this.handleClick} >
                    Most Shared
                  </NavItem>     
                  <NavItem  eventKey={3} onClick={this.handleClick} >
                    Most Emailed
                  </NavItem>     
                   
                </Nav>
                </Col>
                <Col md={3}></Col>   
                </Row>                
              </Navbar>   
            </Row>
            
            
            <LinkDetails mv={this.state.mv} msh={this.state.msh} mem={this.state.mem} articleType={this.state.articleType} currentType={this.state.currentType} sectionType={this.state.sectionType} test={this.state.dat} mostViewed={this.state.mostViewed} pageTitle={this.state.pageTitle}/>		    
      </div>
    	);
  	}
}

export default Links;

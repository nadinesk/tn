import React, { Component } from 'react';
import fetch from 'isomorphic-fetch'
import { Grid, Row, Col, DropdownButton, MenuItem } from 'react-bootstrap';


class LinkDetails extends Component {

	constructor(props) {
	super(props); 

		this.state = {
			dat: '', 
			asdf: 'asdf', 
			sectionType: 'home',
			mostViewed: '',			
			sectionTypes: ['home',
							'opinion',
							'world',
							'national',
							'politics',
							'upshot',
							'nyregion',
							'business',
							'technology',
							'science',
							'health',
							'sports',
							'arts',
							'books',
							'movies',
							'theater',
							'sundayreview',
							'fashion',
							'tmagazine',
							'food',
							'travel',
							'magazine',
							'realestate',
							'automobiles',
							'obituaries',
							'insider'
							],
			sectionTypesMV: ['Arts',
							'Automobiles',
							'Blogs',
							'Books',
							'Business Day',
							'Education',
							'Fashion & Style',
							'Food',
							'Health',
							'Job Market',
							'Magazine',
							'membercenter',
							'Movies',
							'Multimedia',
							'N.Y.%20%2F%20Region',
							'NYT Now',
							'Obituaries',
							'Open',
							'Opinion',
							'Public Editor',
							'Real Estate',
							'Science',
							'Sports',
							'Style',
							'Sunday Review',
							'T Magazine',
							'Technology',
							'The Upshot',
							'Theater',
							'Times Insider',
							'Today’s Paper',
							'Travel',
							'U.S.',
							'World',
							'Your Money',
							'all-sections'],
			stopWords: ['—','i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now']
		}
	}

	componentWillReceiveProps(nextProps) {
		console.log('nextProps.test', nextProps.test)		
		this.setState({
			dat: nextProps.test,
			asdf: 'asdf', 
			mostViewed: nextProps.mostViewed, 
			articleType: nextProps.articleType, 
			sectionType: nextProps.sectionType, 
			currentType: nextProps.currentType
		})

		this.handleSectionTypeSelect = this.handleSectionTypeSelect.bind(this)
	}

	handleSectionTypeSelect = event => {
		const api_key = process.env.REACT_APP_API_KEY
  		const dat = []
  		
  		if (this.state.articleType == 'Top Stories') {  			
  			fetch(`https://api.nytimes.com/svc/topstories/v2/${event}.json?api-key=${api_key}`) 
  			.then(res => 
  				res.json()
  			)
	  		.then(arts => {  			
	  			const dat= arts.results
				this.setState({
					dat: arts.results, 
					sectionType: event        	
				})
	  		})  	
  		}
  		else if (this.state.articleType == 'Most Viewed') {  			
  			fetch(`https://api.nytimes.com/svc/mostpopular/v2/mostviewed/${event}/1.json?api-key=${api_key}`) 
  			.then(res => 
  				res.json()
  			)
	  		.then(arts => {  			
	  			const dat= arts.results
	  			debugger
				this.setState({
					dat: arts.results, 
					sectionType: event        	
				})
	  		})  	
  		}
  		
	}


  
render() {

	var result = this.state.dat != '' ? this.state.dat.map(a => a.title) : null
	var resultStr = result ? result.join(' ') : null
	
	var stopWords = this.state.stopWords
	
	function wordFreq(string, removeWords) {
	    var words = string.toLowerCase().replace(/[.]/g, '').split(/\s/);
	    var freqMap = {};
	    words.forEach(function(w) {
	        if (!freqMap[w]) {
	            freqMap[w] = 0;
	        }
	        freqMap[w] += 1;
	    });

	    stopWords.forEach(e => delete freqMap[e])

	    var sortable = [];

		for (var words in freqMap) {
		    sortable.push([words, freqMap[words]]);
		}

		sortable.sort(function(a, b) {
		    return b[1] - a[1];
		})

		var size = 10;
		var col = 'rgba(255, 0, 0,'
	    var endParen = ')'
		
		var items = sortable.slice(0, size).map(i => 
		  <div style={{fontSize: (i[1]/0.98) * 6,color: col + i[1] * 0.4 + endParen, display: 'inline-block' }}>
		  	{i[0]}{'\u00A0'}</div>	  
		)

		return items
	}

	var newItems = resultStr ? wordFreq(resultStr, this.state.stopWords): null
	
	debugger
	
	const tsTop = (this.state.currentType == 'topStories') ? 
		this.state.dat.slice(0,5).map((art) => (			
			<div className='topFive'>
				{art.multimedia[0]  ? 
							<div ><img style={{width: "100%", display:'inline-block'}} src={art.multimedia[4].url}/></div> : 
						 	null
				}
				<div style={{fontSize: 16, fontWeight: 'bold'}}> <a href={art.url}>{art.title}</a> 
					<span style={{fontWeight: '300'}}> - {art.section} </span> 
					
				</div>
				<div style={{marginBottom: 10}} >{art.abstract}</div>				
			</div>
		))
			: this.state.currentType == 'mostViewed' ? 
				this.state.dat.slice(0,5).map((art) => (
					<div className='topFive'>
						{art.media[0]["media-metadata"][4] ? 
									<div><img style={{width: "100%"}} src={art.media[0]["media-metadata"][4].url}/></div> : null							 	
						}
						<div style={{fontSize: 16, fontWeight: 'bold'}}> <a href={art.url}>{art.title}</a> 
							<span style={{fontWeight: '300'}}> - {art.section} </span> 
							
						</div>
						<div style={{marginBottom: 10}} >{art.abstract}</div>				
					</div> 
		)): null
	
	const ts = this.state.dat != '' ? 
		this.state.dat.slice(6,50).map((art) => (
			<div>
				<div style={{marginBottom: 5, fontWeight: '400'}}><a href={art.url}>{art.title}</a>
					<span style={{fontWeight: '300'}}> - {art.section} </span> 
				</div>				
			</div>
		))
			: null


	const menuItems = this.state.articleType == 'Top Stories' ? this.state.sectionTypes.map((section) => (
			 <MenuItem eventKey={section}>{section}</MenuItem>
		)) : this.state.sectionTypesMV.map((section) => (
			 <MenuItem eventKey={section}>{section}</MenuItem>
		)) 

	

return (
	<Grid>
		<Row>
			<Col md={3}></Col>
			<Col xs={12} md={6}>
		        <h1 style={{textAlign: 'center'}}>{this.state.articleType}</h1>		
		          <DropdownButton
                  title={this.state.sectionType}              
                  id='sectionType'              
                  onSelect={this.handleSectionTypeSelect}
                 >
                 	{menuItems}               
                </DropdownButton>       	        		       
		        <div>{newItems}</div>		       	        		       
		        <div>{tsTop}</div>  
		        <div>{ts}</div>  
		    </Col>		    
		    <Col md={3}></Col>
		</Row>	  		
	</Grid>
  	);
  }
}

export default LinkDetails;

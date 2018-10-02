import React, { Component } from 'react';
import fetch from 'isomorphic-fetch'
import { Grid, Row, Col } from 'react-bootstrap';


class LinkDetails extends Component {

	constructor(props) {
	super(props); 

		this.state = {
			dat: '', 
			asdf: 'asdf', 
			mostViewed: '', 
			stopWords: ['—','i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now']
		}
	}

	componentWillReceiveProps(nextProps) {
		console.log('nextProps.test', nextProps.test)

		this.setState({
			dat: nextProps.test,
			asdf: 'asdf', 
			mostViewed: nextProps.mostViewed
		})
	}


  
render() {

	var result = this.state.dat != '' ? this.state.dat.map(a => a.title) : null
	var resultStr = result ? result.join(' ') : null
	var resultMv = this.state.mostViewed != '' ? this.state.mostViewed.map(a => a.title) : null
	var resultStrMv = resultMv ? resultMv.join(' ') : null

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
	var newItemsMv = resultStrMv ? wordFreq(resultStrMv, this.state.stopWords): null
	var counterTs = 1
	var counterMv = 1
	
	const tsTop = this.state.dat != '' ? 
		this.state.dat.slice(0,5).map((art) => (
			<div>
				<div style={{fontSize: 16, fontWeight: 'bold'}}> <a href={art.url}>{art.title}</a></div>
				<div style={{marginBottom: 10}} >{art.abstract}</div>				
			</div>
		))
			: null
	
	const ts = this.state.dat != '' ? 
		this.state.dat.slice(6,21).map((art) => (
			<div>
				<div style={{marginBottom: 10, fontWeight: 'bold'}}><a href={art.url}>{art.title}</a></div>				
			</div>
		))
			: null

    const mvTop = this.state.mostViewed != '' ? 
		this.state.mostViewed.slice(0,5).map((art) => (
			<div>
				<div style={{fontSize: 16, fontWeight: 'bold'}}><a href={art.url}>{art.title}</a></div>
				<div style={{marginBottom: 10}}>{art.abstract}</div>
			</div>
		))
			: null			

	const mv = this.state.mostViewed != '' ? 
		this.state.mostViewed.slice(6,21).map((art) => (
			<div>
				<div style={{marginBottom: 10, fontWeight: 'bold'}}> <a href={art.url}>{art.title}</a></div>				
			</div>
		))
			: null

return (
	<Grid>
		<Row>
			<Col className='colBorder' xs={12} md={6}>
		        <h1 style={{textAlign: 'center'}}>Top Stories</h1>		       	        		       
		    </Col>
		    <Col className='colBorder' xs={12} md={6}>
		        <h1 style={{textAlign: 'center'}}>Most Viewed</h1>		        
		    </Col>
		</Row>	  
		<Row>
			<Col className='colBorder' xs={12} md={6}>
		        <div>{newItems}</div>		       	        		       
		    </Col>
		    <Col className='colBorder' xs={12} md={6}>
		        <div>{newItemsMv}</div>		        
		    </Col>
		</Row>
		<Row>
			<Col className='colBorder' xs={12} md={6}>		    
				<div>{tsTop}</div>  
		        <div>{ts}</div>  
		    </Col>      
			<Col className='colBorder' xs={12} md={6}>
				<div>{mvTop}</div>  		    
		        <div>{mv}</div>  
		    </Col>      
		</Row>		  
	</Grid>
  	);
  }
}

export default LinkDetails;

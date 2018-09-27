import React, { Component } from 'react';
import fetch from 'isomorphic-fetch'


class LinkDetails extends Component {

	constructor(props) {
		super(props); 

		this.state = {
			dat: '', 
			asdf: 'asdf'

		}
	}

	componentWillReceiveProps(nextProps) {
			console.log('nextProps.test', nextProps.test)

		this.setState({
			dat: nextProps.test,
			asdf: 'asdf'
		})

		
	}
	

  	
	render() {	
		
		const blah = this.state.dat != '' ? 
			this.state.dat.map((art) => (
				<div>
					<div><a href={art.url}>{art.title}</a></div>
					{art.multimedia[0] ? 
						<div><img src={art.multimedia[0].url}/></div> : null
					}
					<div>{art.abstract}</div>
				</div>
				))
			
			: null

		return (
			<div>
        		<div>{blah}</div>		        
		        
		    </div>
    	);
  	}
}

export default LinkDetails;

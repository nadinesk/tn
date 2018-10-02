import React, { Component } from 'react';
import fetch from 'isomorphic-fetch'


class LinkDetails extends Component {

constructor(props) {
super(props); 

this.state = {
dat: '', 
asdf: 'asdf', 
mostViewed: '', 
stopWords: ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now']

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

function wordFreq(string) {
    var words = string.toLowerCase().replace(/[.]/g, '').split(/\s/);
    var freqMap = {};
    words.forEach(function(w) {
        if (!freqMap[w]) {
            freqMap[w] = 0;
        }
        freqMap[w] += 1;
    });

    return freqMap;
}

var wFreq = resultStr ? wordFreq(resultStr) : null

wFreq ? this.state.stopWords.forEach(e => delete wFreq[e]) : null

var sortable = [];

for (var words in wFreq) {
    sortable.push([words, wFreq[words]]);
}

sortable ? sortable.sort(function(a, b) {
    return b[1] - a[1];
}) : null


var size = 15;
var items = sortable.slice(0, size).map(i => 
<div>
  <div>{i[0]}</div>
  <div>{i[1]}</div>
</div>
)



const ts = this.state.dat != '' ? 
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
const mv = this.state.mostViewed != '' ? 
this.state.mostViewed.map((art) => (
<div>
<div><a href={art.url}>{art.title}</a></div>
<div>{art.abstract}</div>
</div>
))

: null

return (
<div>
        <h1>Top Stories</h1>
        <div> {items}</div>
        
        <div>{ts}</div>
        <h1>Most Viewed</h1>
        <div>{mv}</div>  

        
    </div>
    );
  }
}

export default LinkDetails;

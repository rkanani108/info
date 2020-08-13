//'use strict';
//const myservice = require('/service/index.js');


class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false, items:[] };
   
  }

  async componentDidMount() {
    console.log("Did mount called");
    await getPosts().then(result => {console.log(result); this.setState({items:result.posts})});
    
   
   }
   componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      console.log('componentDidUpdate and data has changed!');
    }    
    console.log("componentDidUpdate");
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }
console.log(this.state.items);
    // return( 
    // <button onClick={()=>this.setState({liked: true})}>
    //   Mybutton 
    // </button>
    // )

    return this.state.items.map(item => (
      <div key={item.id} className="blog-content col-md-10 offset-md-1">
          <h1>{item.title}</h1>
          <span dangerouslySetInnerHTML={{__html: item.text}} />
        
      </div>
  ));
  }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(<LikeButton />, domContainer);
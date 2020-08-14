//'use strict';
//const myservice = require('/service/index.js');


class BlogList extends React.Component {
    constructor(props) {
      super(props);
      this.state = { liked: false, items:[],pageurl:"" };
     
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

  return this.state.items.map(item => (
        
<div className="blog-content"  key={item.id}>
    <span className="cat">Web Design</span>
    <h2 className="blog-title">{item.title}</h2>
    <p className="mt-20 mb-30" dangerouslySetInnerHTML={{__html: item.text }} />
    <div className="blog-date cat">August 15, 2018</div>
        <div className="resume-button mt-10">
            <a className="btn-main" href={"blog-light.html?id="+item.id+"&slug="+item.slug}>Read more...</a>
        </div>
    <hr className="mt-35 mb-30"/>
</div>
));
    }
  }
  
  const domContainer = document.querySelector('#blog-list');
  ReactDOM.render(<BlogList />, domContainer);
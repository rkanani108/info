//'use strict';
//const myservice = require('/service/index.js');


class BlogList extends React.Component {
    constructor(props) {
      super(props);
      this.state = { liked: false, items:[],pageurl:"" };
     
    }
  
    async componentDidMount() {
      let take=new URLSearchParams(window.location.search).get("take");
      let skip=new URLSearchParams(window.location.search).get("skip");
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
    <a href={"blog-light.html?id="+item.id+"&slug="+item.slug} ><h2 className="blog-title">{item.title}</h2></a>
    <p className="mt-20 mb-20" dangerouslySetInnerHTML={{__html: item.text }} />
    <div className="blog-date">August 15, 2018</div>
        <div className="resume-button mt-10">
            <a className="btn-main" href={"blog-light.html?id="+item.id+"&slug="+item.slug}>Read more...</a>
        </div>
        <span className="topic-container mt-30 mb-30">&nbsp;</span>
   
</div>
));
    }
  }
  
  const domContainer = document.querySelector('#blog-list');
  ReactDOM.render(<BlogList />, domContainer);
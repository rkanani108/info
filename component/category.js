class BlogCategory extends React.Component {
    constructor(props) {
      super(props);
      this.state = { liked: false, items:[],category:[],pageurl:"" };
    }
  
    async componentDidMount() {
  
      await getPosts().then(result => {
                              console.log(result); 
                              this.setState({items:result.posts});
                              //this.setState({category:[...new Set({category:result.posts.map(item => item.category)})]});
       });
    }
 
    render() {
      let cat=uniqueBy(this.state.items,"category");
      console.log(cat);
      let uniqueValues = [];
    
     
      return  this.state.items.map(item => (
              <li key={item.id} className="cat-item cat-item-490419">
                  <a href={"/index.html?cat="+item.category +"#blog"}>{item.category}</a>
              </li>
          ));
    }
  }
  function uniqueBy(arr, prop){
    return arr.reduce((a, d) => {
      if (!a.includes(d[prop])) { a.push(d[prop][0]); }
      return a;
    }, []);
  }
  const blogdomContainer = document.querySelector('#blog-category');

  ReactDOM.render(<BlogCategory />, blogdomContainer);
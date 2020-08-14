'use strict';
//const myservice = require('/service/index.js');


class BlogDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false, item:{} };
 
  }

  async componentDidMount() {
   let id=new URLSearchParams(window.location.search).get("id");
   let slug=new URLSearchParams(window.location.search).get("slug")
   // console.log("slug:"+new URLSearchParams(this.props.location.search).get("slug"));
    console.log("Did mount called");
    await getPost(id).then(result => {console.log(result); this.setState({item:result})});
   
    
   
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

    return (
    <>
      <div key={this.state.item.id} className="blog-content col-md-10 offset-md-1">
          <h1>{this.state.item.title}</h1>
          <span dangerouslySetInnerHTML={{__html: this.state.item.text}} />
      
      </div>
    <div className="blog-page">
        <div className="blog-image">
            <img src="img/blog/blog-page-img.jpg" alt=""/>
        </div>
        <div className="blog-container">
                        <div class="row">

                          
                            <div className="blog-heading col-md-8 offset-md-2">
                                <span className="cat">Fashion</span>
                                <h1>{this.state.item.title}</h1>
                                <span className="blog-date">January 20, 2018</span>
                            </div>


                            <div className="blog-content col-md-10 offset-md-1">
                            <span dangerouslySetInnerHTML={{__html: this.state.item.text}} />
                            </div>

                            <div className="blog-comments col-md-8 offset-md-2">
                                <h4 className="mb-40">Post Comments</h4>
                                <ul className="comment-list">

                                    <li className="comment">

                                        <div className="author-img">
                                            <img src="img/blog/authors/author-1.jpg" alt=""/>
                                        </div>
                                        <div className="comment-text">
                                            <span className="reply"><a href="#">Reply</a></span>
                                            <h6 className="author">Jane Doe</h6>
                                            <span className="date">June 10, 2018 at 5:39 am</span>
                                            <p>Deep v cliche lomo biodiesel Neutra selfies. Shorts fixie consequat flexitarian four loko </p>
                                        </div>

                                    </li>
                                    </ul>
                             </div>
                             <div className="comment-form col-lg-8 offset-lg-2">

                              <h4 className="mt-40 mb-40">Leave A Reply</h4>
                              <form action="#">

                                  <div className="row">
                                      
                                      <div className="col-md-6 mb-50">
                                          <span className="input">
                                              <input className="input__field" type="text" id="name" name="name" required/>
                                              <label className="input__label" for="name">Name</label>
                                          </span>
                                      </div>

                                    
                                      <div className="col-md-6 mb-50">
                                          <span class="input">
                                              <input className="input__field" type="text" id="email" name="email" required/>
                                              <label className="input__label" for="email">Email</label>
                                          </span>
                                      </div>

                                  
                                      <div className="col-md-12 mb-30">
                                          <span className="input">
                                              <textarea  className="input__field" id="message" name="message" rows="5" required></textarea>
                                              <label class="input__label" for="message">Your Comment</label>
                                          </span>
                                      </div>

                                    
                                      <div clclassNameass="col-md-12">
                                          <button className="btn-main">Post Comment</button>
                                      </div>

                                  </div>

                              </form>

                            </div>
                         </div>
          </div>

    </div>
      </>
    );
  }
  }


const domContainer = document.querySelector('#blog-detail');
ReactDOM.render(<BlogDetail />, domContainer);
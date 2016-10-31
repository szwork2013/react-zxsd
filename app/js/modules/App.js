/**
 * Created by 1 on 2016/10/18.
 */
import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
           <div>
               {this.props.children}
           </div>
        )
    }
}
module .exports = App;
import React, { Component ,Fragment } from 'react'

export default class BoardDetil extends Component {

  constructor(props){
    super(props);
    this.state={
      updateName:''
    }
  }

  handleChange = (e)=>{
    this.setState({
      updateName : e.target.value
    });
  }

  nameChangeEvt=(index)=>{
    this.props.nameChangeEvt(index,this.state.updateName);
  }

  render() {
    const {index,names} = this.props;
    
    return (
      <Fragment>
         <span>{names[index].name}</span> 입니다.<br/><br/> 
         <input type="text" value={this.state.updateName} onChange={this.handleChange}/>
         <button onClick={() => {this.nameChangeEvt(index)}}> 수정 </button>
        <br/><br/>
      </Fragment>
    )
  }
}

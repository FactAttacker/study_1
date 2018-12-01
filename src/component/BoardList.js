import React, { Component ,Fragment } from 'react'
import classNames  from 'classnames';
import Board from '../styles/board.scss';
import BoardDetil from './BoardDetil';
import Collapsible from 'react-collapsible';

const scss = classNames.bind(Board);
export default class BoardList extends Component {
    
    constructor(){
        super();
        this.state = {
            names:[
                {name:'홍길동', checked:false,index:0},
                {name:'AA', checked:false,index:1},
            ],
            name:'',
            checkCnt:0,
            nameChangeEvt : this.nameChangeEvt,
         }
    }
    
    addNamesEvt = () => {
        const {name} = this.state;
        if(name.length !== 0 ){
            this.setState({
                names:this.state.names.concat({
                      name:name
                    , checked:false 
                    , index:this.state.names.length
                }),
                name:''
            });
        }
    }

    inputTextChange = (e) =>{
        this.setState({
            name : e.target.value
        });
    }

    onCheckedEvt = (e) => {
        let {checkCnt} = this.state;
        const {checked} = e.target;
        this.setState({
            checkCnt: checked ? ++checkCnt : --checkCnt ,
            names:this.state.names.map((key,index)=> 
                ({    name:key.name
                    , checked: index === parseInt(e.target.value) ? checked : key.checked  
                    , index :index
                })
            )
        });
    }

    removeList = () =>{
        this.setState({
            checkCnt: 0 ,
            names: this.state.names.filter((item,i) =>  
                    item.checked ? false : true
            ) 
        });
    }

    allSelect =(e) =>{
        let {checked} = e.target;
        this.setState({
            checkCnt: checked ? this.state.names.length : 0,
            names:this.state.names.map((key,i) => 
                ({    name:key.name
                    , checked:  checked
                    , index : i  
                })
            )
        });
    }

    nameChangeEvt = (index,reName) =>{
        this.setState({
            names:this.state.names.map((key,i)=> 
                ({ name: i === index ? reName : key.name
                  , checked: key.checked  
                  , index : i
                })
            )
        });
    }
    render() {
        const nameList = this.state.names.map(
            (key,index)=>(
                 <li>
                    <input 
                        key={index} 
                        className={scss('big_checkbox')} 
                        value={index} 
                        type='checkbox' 
                        checked={key.checked} 
                        onChange={this.onCheckedEvt} />
                    <div className={scss('board_name')} >
                        <Collapsible trigger={key.name}>
                             <BoardDetil names={this.state.names} index={key.index}  nameChangeEvt={this.state.nameChangeEvt} />
                        </Collapsible>
                    </div>
                </li>
            )
        );

        return (
            <Fragment>
              <div className={scss('magin_center')}>
                <input type="text" onChange={this.inputTextChange}  value={this.state.name}/>
                <input type="button" value="추가" onClick={this.addNamesEvt}/>
              </div>
              <p>Checked Count : {this.state.checkCnt}</p>
              <div>
                <span>전체 선택</span>
                <input type="checkbox" className={scss('big_checkbox')} onChange={this.allSelect} />
              </div>
              <ul>
                 {nameList} 
              </ul>
              <div className={scss('button_center')}>
                <button onClick={ this.removeList }> 삭제 </button>
              </div>
            </Fragment>
        )   
    }
}

import React,{Component} from 'react'
let GlobalElapsed=0;
const startDate=Date.now();
class Session extends Component{

    constructor(props){

      super(props)
      this.state={
      	elpased:0

        }

      
      this.tick=this.tick.bind(this)
      setInterval(this.tick,1000)

    }



    componentWillUpdate(nextProps, nextState) {

      if(nextState.selectedPair!== this.state.selectedPair){
      	
          this.setState({selectedPair:nextState.selectedPair})
        }

          
     
    } 

    
      ComponentWillReceiveProps(nextProps){


      }

      ComponentDidMount(){
      }

      tick(){
              GlobalElapsed=Date.now() - startDate
              this.setState({elapsed: GlobalElapsed})
     }

      render(){
        let {elpased}=this.state
                                   
	    let elapsed = Math.round(this.state.elapsed / 100);

	    let seconds = (elapsed / 10).toFixed(1); 

    

      	return(
      		 <span>
      		 	    <span className="white">Session:</span>
	                <span className="green">{seconds}{this.props.sec}</span>

             </span>
      		)
      }
    }



export default Session
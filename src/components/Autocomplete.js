import React, {useState, useEffect, useRef} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function Autocomplete (props) {
  
  const [inputVal, setInputVal] = useState('');
  const [showList, setShowList] = useState(false);
  const inputRef = useRef();


  useEffect(() => {
    if (showList) {
      document.addEventListener('click', handleOutsideClick);
    } 
    // else {
    //   console.log("Removing Autocomplete listener on update!");
    //   document.removeEventListener('click', handleOutsideClick);
    // }
    return()=> {
      console.log("Cleaning up event listener from Autocomplete!");
      document.removeEventListener('click', handleOutsideClick);
    }
  }, [showList]);


  function handleInput(e){
    setInputVal(e.target.value);
  }

  function selectName(e) {
    e.stopPropagation();
    setInputVal(e.target.innerHTML);
    setShowList(!showList);
  }

  function handleOutsideClick() {
    // Leave dropdown visible as long as input is focused
    if (document.activeElement === inputRef.current) return; 
    else setShowList(!showList);
  }

  const matches = () => {
    const names = props.names;
    const inputLength = inputVal.length;
    const matches = [];

    if (inputLength === 0) return names;

    names.forEach(name => {
      const nameSegment = name.slice(0, inputLength);
      if (nameSegment.toLowerCase() === inputVal.toLowerCase()) {
        matches.push(name);
      }
    });

    if (matches.length === 0) matches.push('No matches');

    return matches;
  }
   
    const results = matches().map((props, idx) => {
      console.log(props, 'props in results')
      console.log(idx, 'iiiiddddxxxx')
     
      return (
        <TransitionItem selectName={selectName}/>
    //     <CSSTransition
    //       nodeRef={nodeRef}
    //       key={props.result}
    //       classNames="result"
    //       timeout={{ enter: 500, exit: 300 }}
    //     >
    //       {/* <li ref={nodeRef} className="nameLi" onClick={props.selectName}> */}
    //         <TransitionItem  ref={nodeRef} className="nameLi" onClick={props.selectName}/>
    //       {/* </li> */}
    // </CSSTransition>
        
      )
    });

    return (
      <section className="autocomplete-section">
        <h1>Autocomplete</h1>
        <div className="auto">
          <input
            placeholder="Search..."
            ref={inputRef}
            onChange={handleInput}
            value={inputVal}
            onFocus={() => setShowList(!showList)}
          />
          {showList && (
            <ul className="auto-dropdown">
              <TransitionGroup selectName={selectName}>
                {results}
              </TransitionGroup>
            </ul>
          )}
        </div>
      </section>
    );
  
}

function TransitionItem(props) {

  const nodeRef = useRef();
 

  return(
    <CSSTransition
          nodeRef={nodeRef}
          classNames="result"
          timeout={{ enter: 500, exit: 300 }}
        >
          <li ref={nodeRef} className="nameLi" onClick={props.selectName}>
      
          </li>
    </CSSTransition>
   
  )
}

export default Autocomplete;
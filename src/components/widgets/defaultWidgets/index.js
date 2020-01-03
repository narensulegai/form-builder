//Define your widgets here -
//value will contain the initialization value of the component,
//this value must be updated using onValueChange function
import React, {useEffect, useState, useRef} from 'react';
import InputBox from "./../InputBox";
import _ from "lodash";

export const widgets = {
  EmailInputBox: (props) => {
    return <InputBox text={props.value} pattern={'email'} onChange={props.onValueChange} {...props.options}/>;
  },
  InputBox: (props) => {
    return <InputBox text={props.value} pattern={'nonEmpty'} onChange={props.onValueChange} {...props.options}/>;
  },
  Text: (props) => {
    return <div className="ele">{props.options.text}</div>
  },
  Question: (props) => {
    return <div className="ele">{props.options.text}</div>;
  },
  YesNo: (props) => {

    const [isYes, setYes] = useState(props.value === null ? false : props.value);
    const [isNo, setNo] = useState(props.value === null ? false : !props.value);

    const onYes = () => {
      setYes(true);
      setNo(false);
      props.onValueChange(true);
    };

    const onNo = () => {
      setNo(true);
      setYes(false);
      props.onValueChange(false);
    };

    return <div className="ele">
      <span>Yes</span>
      &nbsp;<input type="radio"
                   checked={isYes}
                   onChange={onYes}/>
      &nbsp;<span>No</span>
      &nbsp;<input type="radio"
                   checked={isNo}
                   onChange={onNo}/>
    </div>
  },
  YesNoText: (props) => {
    const [isYes, setYes] = useState(props.value === null ? false : props.value);
    const [isNo, setNo] = useState(props.value === null ? false : !props.value);

    const onYes = () => {
      setYes(true);
      setNo(false);
      props.onValueChange(true);
    };

    const onNo = () => {
      setNo(true);
      setYes(false);
      props.onValueChange(false);
    };
    return <div className="ele col">
      <div className="box" style={{background: isYes === true ? 'grey' : null}} onClick={onYes}>Yes</div>
      <div className="box" style={{background: isNo === true ? 'grey' : null}} onClick={onNo}>No</div>
    </div>
  },
  Bop: (props) => {
    const options = props.options.options;
    const [currentSelection, setSelection] = useState(props.value);
    const select = (o) => {
      setSelection(o);
      props.onValueChange(o);
    };
    return <div className="ele col">
      {options.map((o, i) => {
        return <div key={i}
                    className="box"
                    style={{background: currentSelection === o ? 'grey' : null}}
                    onClick={() => {
                      select(o);
                    }}>
          {o}
        </div>
      })}
    </div>
  },
  GoogleAssist: (props) => {
    const inputEl = useRef(null);
    const {exportNames} = props.options;

    useEffect(() => {
      const autocomplete = new window.google.maps.places.Autocomplete(inputEl.current, {
        types: ['establishment'],
        componentRestrictions: {'country': ['us']},

      });
      autocomplete.setFields(['address_components', 'name', 'rating', 'place_id', 'photos', 'formatted_address', 'adr_address']);
      const autocompleteLsr = autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        place.photosUrl = (place.photos || []).map(p => {
          return p.getUrl({maxHeight: 100})
        });


        for (let k in exportNames) {
          props.onGlobalValueChange(exportNames[k], _.get(place, k, null));
        }

      });

      return () => {
        window.google.maps.event.removeListener(autocompleteLsr);
        window.google.maps.event.clearInstanceListeners(autocomplete);
      }
    });

    const searchAgain = () => {
      inputEl.current.value = '';
      for (let k in exportNames) {
        props.onGlobalValueChange(exportNames[k], null);
      }
      inputEl.current.focus();
    };

    const enterManually = () => {

    };

    return <div className="formElement">
      <input ref={inputEl} type="text"/>
      &nbsp;&nbsp;
      <button onClick={searchAgain}>Search again</button>
      &nbsp;&nbsp;
      <button onClick={enterManually}>Enter manually</button>
    </div>
  },
  GoogleImages: (props) => {
    useEffect(() => {
      console.log('GoogleImages');
    });
    useEffect(() => {
      console.log(props.globalValue);
    }, []);
    return <div>{props.value === null
      ? null
      : props.value.slice(0, 3).map((imgUrl, i) => {
        return <img key={i} src={imgUrl} alt=""/>
      })}
    </div>;
  },
  GoogleRating: (props) => {
    return props.value === null
      ? null
      : <div>{props.value}/5</div>
  }
};

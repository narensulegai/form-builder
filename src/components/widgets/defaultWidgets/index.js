//Define your widgets here -
//value will contain the initialization value of the component,
//this value must be updated using onValueChange function
import React, {useEffect, useState, useRef} from 'react';
import InputBox from "./../InputBox";
import _ from "lodash";
import Form from '../../Form';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';

export const widgets = {
  EmailInputBox: (props) => {
    return <InputBox text={props.value} pattern={'email'} onChange={props.onValueChange} {...props.options}/>;
  },
  InputBox: (props) => {
    return <InputBox text={props.value} pattern={'nonEmpty'} onChange={props.onValueChange} {...props.options}/>;
  },
  Text: (props) => {
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    var text = _.template(props.options.text)(props.globalValue);
    return <div className="ele">{text}</div>
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

        const globalValues = {};
        for (let k in exportNames) {
          globalValues[exportNames[k]] = _.get(place, k, null);
        }
        props.onGlobalValueChange(globalValues);
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

    return <div className="formElement">
      <input ref={inputEl} type="text"/>
      <button className="smallMarginLeft" onClick={searchAgain}>Search</button>
    </div>
  },
  GoogleImages: (props) => {
    return <div>{props.value === null
      ? null
      : props.value.slice(0, 3).map((imgUrl, i) => {
        return <img key={i} src={imgUrl} alt=""/>
      })}
    </div>;
  },
  Journey: (props) => {
    const [currentPage, setCurrentPage] = useState(props.value === null ? 0 : props.value.currentPage);
    const [errors, setErrors] = useState(null);

    const validatePage = () => {
      const p = props.options.pages[currentPage];

      return p.validate.reduce((m, v) => {
        if (_.get(props.value[p.name], v.name, null) === null) {
          m.push(v.errorMessage);
        }
        return m;
      }, []);
    };

    const onNext = () => {
      const errors = validatePage();
      if (errors.length) {
        setErrors(errors);
      } else {
        setErrors(null);
        if (currentPage < props.options.pages.length - 1) {
          const c = currentPage + 1;
          setCurrentPage(c);
          props.onValueChange({...props.value, ...{currentPage: c}});
        }
      }
    };

    const onBack = () => {
      const errors = validatePage();
      if (errors.length) {
        setErrors(errors);
      } else {
        setErrors(null);
        if (currentPage > 0) {
          const c = currentPage - 1;
          setCurrentPage(c);
          props.onValueChange({...props.value, ...{currentPage: c}});
        }
      }
    };

    const onPageChange = (d, name) => {
      const value = props.value === null ? {} : {...props.value};
      value[name] = d;
      props.onValueChange(value);
    };

    return <div>
      <Breadcrumbs separator=">">
        {props.options.pages.map((p, i) => {
          return <Typography key={i} color={currentPage === i ? 'textPrimary' : 'textSecondary'}>{p.title}</Typography>
        })}
      </Breadcrumbs>

      {errors === null
        ? null
        : errors.map((e, i) => <h5 key={i}>{e}</h5>)
      }
      {props.options.pages.map((p, i) => {
        return <div key={i} className={i !== currentPage ? 'hide' : null}>
          <Form init={props.value === null ? null : props.value[p.name]}
                content={p.content}
                onChange={(d) => {
                  onPageChange(d, p.name)
                }}/>
        </div>
      })}

      <button onClick={onBack}>Back</button>
      &nbsp;&nbsp;
      <button onClick={onNext}>Next</button>

    </div>
  },
  Summary: (props) => {
    const [content, setContent] = useState(props.value === null ? null : props.value.content);
    const [collapsed, setCollapsed] = useState(props.value === null ? false : props.value.collapsed);

    props.onContentValueUpdate((d) => {
      setContent(d);
    });

    const toggle = () => {
      const c = !collapsed;
      setCollapsed(c);
      props.onValueChange({content: content, collapsed: c});
    };

    const handleOnSave = () => {
      toggle();
    };

    const handleOnEdit = () => {
      toggle();
    };

    return <div>
      <div>
        {collapsed
          ? content !== null
            ? <div>
              <div>
                {props.options.summary.map((s, i) => {
                  return <div key={i}>{s.name}&nbsp;:&nbsp;{content[s.name]}</div>
                })}
              </div>
              <div>
                <button onClick={handleOnEdit}>Edit</button>
              </div>
            </div>
            : null
          : props.content
        }
      </div>
      <button onClick={handleOnSave}>Save</button>
    </div>
  },
};

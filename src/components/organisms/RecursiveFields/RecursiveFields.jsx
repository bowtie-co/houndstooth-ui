import React, { Component } from 'react'
import { FieldContainer } from '../../molecules'

export default class RecursiveFields extends Component {
  constructor(props) {
    super(props)
    // const testFields = {
    //   something: 'string',
    //   // a_list_of_strings: [
    //   //   'abc',
    //   //   '123'
    //   // ],
    //   another_object: {
    //     a_nested_key: 'value',
    //     an_integer: 12345,
    //     a_boolean: true,
    //     double_object: {
    //       what: 'yes',
    //       do_it: 'please'
    //     }
    //   }
    // };

    this.state = {
      activeFile: {},
      fields: {}
    }

    this.renderField = this.renderField.bind(this);
    this.renderFields = this.renderFields.bind(this);
  }

  componentWillMount(){
    this.setState({ fields: this.props.fields })
  }
  
  componentWillReceiveProps(nextProps){
    if (nextProps.fields !== this.props.fields) {
      this.setState({ fields: this.props.fields })
    }
  }

  handleChange(key, value) {
    

    const keys = key.split('.');

    // console.log('keys', keys);

    const fields = Object.assign({}, this.state.fields);
    // const fieldsCopy = Object.assign({}, this.state.activeFile.fields);

    // console.log('fields copy', fields);

    let pointer = fields;

    // console.log('pointer', pointer);

    for (let i=0; i< keys.length; i++) {
      const k = keys[i];

      if (i === keys.length-1) {
        pointer[k] = value;
      } else {
        pointer = pointer[k];        
      }

      // console.log('pointer', pointer);
    }

    // console.log('updated fields', fields);

    // const activeFile = Object.assign({}, this.state.activeFile)
    // activeFile.fields = fieldsCopy;

    this.setState({ fields })

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(fields);
    }

    // this.setState({ fields: fieldsCopy });
  }

  renderField(key, index, field, location='') {
    const current_location = location === '' ? key : `${location}.${key}`;
    const input_id = `field-${key}-${index}-input`;

    if (Array.isArray(field)) {
      return (
        <div
          key={input_id}
        >
          <p>{key}</p>
        </div>
        );
    } else if (field && typeof field === 'object') {
      return (
        <div
          key={input_id}
        >
          <p>{key}</p>
          {this.renderFields(field, current_location)}
        </div>
      );
    } else {

      return (
        <div
          key={input_id}
        >
          <label
            htmlFor={input_id}
          >
            {key}
          </label>
          <FieldContainer 
            getUploadPreview={this.props.getUploadPreview}
            input_id={input_id} 
            name={key} 
            // field={field} 
            handleChange={(key, value) => this.handleChange(current_location, value)}
            />

        </div>
      )
    }
  }

  renderFields(fields, location='') {
    // console.log('render fields', fields);
    const fieldKeys = Object.keys(fields);

    return fieldKeys.map((key, index) => {
      const field = fields[key];

      return this.renderField(key, index, field, location);
    })
  }

  mapCollectionFields() {
    // check to see if there is a fields value
    // if so, render each of the keys as inputs
    if (this.state.fields) {
      return this.renderFields(this.state.fields);
      // const fieldKeys = Object.keys(this.state.activeFile.fields)
      // return fieldKeys.map((key, i) => {
      //   const field = this.state.activeFile.fields[key];

      //   if (Array.isArray(field)) {
      //     field.forEach(value => {
      //       return this.renderField()
      //     })
      //   } else if (typeof field === 'object') {

      //   } else {

      //   }

      //   return (
          // <input
          //   key={i}
          //   placeholder={key}
          //   className={styles.fieldInput}
          //   value={ this.state.activeFile.fields[key] || '' }
          //   onChange={(e) => this.handleChange(key, e.target.value) }>
          // </input>
      //   )
      // })
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.mapCollectionFields()}
        </div>
        {/* <WysiwygEditor /> */}
        {/* <button onClick={() => this.handleClick()}>
          {this.actionText}
        </button> */}
      </div>
    )
  }
}
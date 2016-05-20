import React from 'react';


class Label extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    children: React.PropTypes.any.isRequired
  }

  render() {
    const props = {
      className: 'st2-auto-form__label ' + (this.props.className || 'st2-auto-form__text-field')
    };

    return <label {...props}>
      { this.props.children }
    </label>;
  }
}

class Title extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    spec: React.PropTypes.object
  }

  render() {
    let name = this.props.spec.name || this.props.name;

    if (name && this.props.spec.required) {
      name += ' *';
    }

    return <div className='st2-auto-form__title'>
      { name }
    </div>;
  }
}

class ErrorMessage extends React.Component {
  static propTypes = {
    children: React.PropTypes.string
  }

  render() {
    const props = {
      className: 'st2-auto-form__error'
    };

    return <span {...props} >
      { this.props.children }
    </span>;
  }
}

class Icon extends React.Component {
  static propTypes = {
    name: React.PropTypes.string
  }

  render() {
    const { name } = this.props;

    const props = {
      className: 'st2-auto-form__type'
    };

    return <span {...props}>{ name }</span>;
  }
}

class Button extends React.Component {
  static propTypes = {
    icon: React.PropTypes.string,
    title: React.PropTypes.string,
    onClick: React.PropTypes.func
  }

  handleClick(e) {
    e.preventDefault();
    return this.props.onClick && this.props.onClick(e);
  }

  render() {
    const props = {
      className: `st2-auto-form__button st2-icon__${this.props.icon}`,
      onClick: (e) => this.handleClick(e),
      title: this.props.title
    };

    return <span {...props} />;
  }
}

class Description extends React.Component {
  static propTypes = {
    spec: React.PropTypes.object
  }

  render() {
    return <p className='st2-auto-form__description'>
      { this.props.spec.description }
    </p>;
  }
}

class Suggester extends React.Component {
  static propTypes = {
    suggestions: React.PropTypes.array,
    onSelect: React.PropTypes.func
  }

  state = {
    selected: 0
  }

  previous() {
    let { selected } = this.state;

    selected -= 1;

    selected = selected >= 0 ? selected : 0;

    this.setState({ selected });
  }

  next() {
    let { selected } = this.state;

    selected += 1;

    selected = selected < this.suggestions.length ? selected : this.props.suggestions.length;

    this.setState({ selected });
  }

  handleClick(e, name) {
    e.stopPropagation();

    if (this.onSelect) {
      return this.onSelect(name);
    }
  }

  render() {
    const props = {
      className: 'st2-auto-form__suggestions'
    };

    const nameProps = {
      className: 'st2-details__header-name'
    };

    const descriptionProps = {
      className: 'st2-details__header-description'
    };

    return <div {...props}>
      {
        this.props.suggestions.map(({ name, description }, i) => {
          const suggestionProps = {
            key: name,
            className: 'st2-auto-form__suggestion',
            onClick: (e) => console.log(e, name)
          };

          if (i === this.state.selected) {
            suggestionProps.className += ' ' + 'st2-auto-form__suggestion--active';
          }

          return <div {...suggestionProps}>
            <div {...nameProps}>{ name }</div>
            <div {...descriptionProps}>{ description }</div>
          </div>;
        })
      }
    </div>;
  }
}

export class TextFieldWrapper extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    spec: React.PropTypes.object,
    className: React.PropTypes.string,
    value: React.PropTypes.any,
    invalid: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    children: React.PropTypes.element.isRequired,
    icon: React.PropTypes.string,
    suggestions: React.PropTypes.array,
    labelClass: React.PropTypes.string
  }

  handleKeydown(e) {
    if (this.props.suggestions) {
      if (e.keyCode === 38) {
        e.preventDefault();
        this.refs.suggester.previous();
      }

      if (e.keyCode === 40) {
        e.preventDefault();
        this.refs.suggester.next();
      }

      if (e.keyCode === 13) {
        e.preventDefault();
        console.log('enter');
      }
    }
  }

  render() {
    const lineProps = {
      className: 'st2-auto-form__line'
    };

    if (this.props.className) {
      lineProps.className += ' ' + this.props.className;
    }

    const suggesterProps = {
      ref: 'suggester',
      suggestions: this.props.suggestions,
      onSelect: (...args) => this.handleSuggestion(...args)
    };

    const extChildProps = {};

    if (this.props.suggestions) {
      extChildProps.onKeyDown = (e) => this.handleKeydown(e);
    }

    const line = <div {...lineProps}>
      <Label className={this.props.labelClass} >
        <Title {...this.props} />
        <ErrorMessage>{ this.props.invalid }</ErrorMessage>
        <Icon name={ this.props.icon } />
        { React.cloneElement(this.props.children, extChildProps) }
      </Label>
      { !!this.props.suggestions && <Suggester {...suggesterProps} /> }
      <Description {...this.props} />
    </div>;

    return line;
  }
}

export class BooleanFieldWrapper extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    spec: React.PropTypes.object,
    value: React.PropTypes.any,
    disabled: React.PropTypes.bool,
    children: React.PropTypes.element.isRequired,
    onReset: React.PropTypes.func
  }

  handleReset() {
    return this.props.onReset && this.props.onReset();
  }

  render() {
    const { name, spec } = this.props;

    const blockProps = {
      className: 'st2-auto-form__checkbox-block',
    };

    const buttonProps = {
      icon: 'cancel',
      title: 'reset default',
      onClick: () => this.handleReset()
    };

    const labelProps = {
      className: 'st2-auto-form__checkbox-label',
    };

    const line = <div className='st2-auto-form__line'>
      <Label>
        <div {...blockProps} >
          { !this.props.disabled && <Button {...buttonProps} /> }
          { this.props.children }
          <span {...labelProps} >{ spec.name || name }</span>
        </div>
      </Label>
      <Description {...this.props} />
    </div>;

    return line;
  }
}

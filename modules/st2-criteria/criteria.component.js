import React from 'react';

import EnumField from '../st2-auto-form/fields/enum';
import StringField from '../st2-auto-form/fields/string';

const types = {
  'matchregex': 'Matches Regex',
  'eq': 'Equals',
  'equals': 'Equals',
  'nequals': 'Not Equals',
  'neq': 'Not Equals',
  'ieq': 'Equals Case Insensitive',
  'iequals': 'Equals Case Insensitive',
  'contains': 'Contains',
  'icontains': 'Contains Case Insensitive',
  'ncontains': 'Not Contains',
  'incontains': 'Not Contains Case Insensitive',
  'startswith': 'Starts With',
  'istartswith': 'Starts With Case Insensitive',
  'endswith': 'Ends With',
  'iendswith': 'Ends With Case Insensitive',
  'lt': 'Less Than',
  'lessthan': 'Less Than',
  'gt': 'Greater Than',
  'greaterthan': 'Greater Than',
  'td_lt': 'Earlier Than',
  'timediff_lt': 'Earlier Than',
  'td_gt': 'Later Than',
  'timediff_gt': 'Later Than',
  'exists': 'Exists',
  'nexists': 'Doesn\'t Exist'
};

export default class Criteria extends React.Component {
  static propTypes = {
    spec: React.PropTypes.object,
    ngModel: React.PropTypes.object,
    disabled: React.PropTypes.bool,
    onChange: React.PropTypes.func
  }

  handleChange(name, value) {
    const { onChange } = this.props;
    return onChange && onChange(name, value);
  }

  render() {
    const { disabled, ngModel } = this.props;

    const lineProps = {
      className: 'st2-criteria__line'
    };

    const keyProps = {
      className: 'st2-criteria__entity',
      spec: {},
      suggestions: [{
        name: 'some',
        description: 'stuff'
      }, {
        name: 'thing',
        description: 'stuff2'
      }, {
        name: 'else',
        description: 'stuff3'
      }]
    };

    const typeProps = {
      className: 'st2-manual-form st2-criteria__entity',
      spec: {
        enum: _.map(types, (value, key) => ({ key, value })),
        required: true
      }
    };

    const patternProps = {
      className: 'st2-manual-form st2-criteria__entity',
      spec: {}
    };

    const buttonProps = {
      className: 'st2-icon__cancel st2-criteria__remove',
      onClick: (e) => this.handleRemove(e)
    };


    return <div>
      {
        !!ngModel && Object.keys(ngModel).map((key) => {
          return <div key={key} {...lineProps}>
            <StringField {...keyProps} />
            <EnumField {...typeProps} />
            <StringField {...patternProps} />
            {
              !disabled && <i {...buttonProps}></i>
            }
          </div>;
        })
      }
      <div className="st2-criteria__buttons" ng-if="!disabled">
        <input type="button"
            className="st2-forms__button st2-forms__button--small"
            ng-click="add()"
            value="Add criteria" />
      </div>
    </div>;
  }
}

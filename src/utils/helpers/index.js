import _ from 'lodash';

export const isNonEmptyArray = (arr) => _.isArray(arr) && arr.length;
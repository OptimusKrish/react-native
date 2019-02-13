import 'react-native';
import React from 'react';
import { MonoText } from '../StyledText';
import { AddExpense } from '../myThemes/addExpense';
import { ListExpense } from '../myThemes/listExpense';
import renderer from 'react-test-renderer';

describe('Component test', () => {

  it('StyleText renders correctly', () => {
    const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();
  
    expect(tree).toMatchSnapshot();
  });

  it('AddExpense renders correctly', () => {
    const tree = renderer.create(<AddExpense/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('ListExpense renders correctly', () => {
    const mockData =  [
      {
       "Amount": 15,
       "Category": "cigrette",
       "Date": "Feb 08 2019",
       "ID": 6,
       "Time": "21:39:34 PM",
       "Timestamp": 1549642174007,
       "expTimestamp": 1549642140003,
       "sameDate": false,
     },
     {
       "Amount": 23,
       "Category": "snacks",
       "Date": "Feb 08 2019",
       "ID": 1,
       "Time": "20:33:43 PM",
       "Timestamp": 1549638223978,
       "expTimestamp": 1549638213153,
       "sameDate": false,
     }
   ];
    const tree = renderer.create(<ListExpense listExp = {mockData}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});

